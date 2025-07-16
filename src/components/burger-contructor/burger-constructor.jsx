import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addIngredient,
	clearConstructor,
} from '../../services/burger-constructor/burger-constructor-slice';
import { setCounters } from '../../services/burger-ingredients/burger-ingredients-slice';
import { createOrder } from '../../services/order-details/order-details-slice';
import { useDrop } from 'react-dnd';
import { DraggableBurgerConstructorItem } from '@components/burger-constructor-item/draggable-burger-constructor-item';
import { LockedBurgerConstructorItem } from '@components/burger-constructor-item/locked-burger-constructor-item';
import { PlaceholderBurgerConstructorItem } from '@components/burger-constructor-item/placeholder-burger-constructor-item';
import { OrderDetails } from '@components/order-details/order-details';
import { Modal } from '@components/modal/modal';
import styles from './burger-constructor.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = () => {
	const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
	const dispatch = useDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => setIsModalOpen(false);

	const handleOrderClick = () => {
		if (!bun) return;

		const ids = [bun._id, ...ingredients.map((i) => i._id), bun._id];
		dispatch(createOrder(ids)).then((res) => {
			if (createOrder.fulfilled.match(res)) {
				dispatch(clearConstructor());
			}
		});

		setIsModalOpen(true);
	};

	const [, dropRef] = useDrop({
		accept: 'ingredient',
		drop: (item) => {
			dispatch(addIngredient(item));
		},
	});

	const summ = React.useMemo(() => {
		const ingredientsSum = ingredients.reduce((sum, i) => sum + i.price, 0);
		const bunPrice = bun ? bun.price * 2 : 0;
		return ingredientsSum + bunPrice;
	}, [ingredients, bun]);

	useEffect(() => {
		const counters = {};

		if (bun) {
			counters[bun._id] = 2;
		}

		ingredients.forEach((item) => {
			if (counters[item._id]) {
				counters[item._id]++;
			} else {
				counters[item._id] = 1;
			}
		});

		dispatch(setCounters(counters));
	}, [bun, ingredients, dispatch]);

	return (
		<section className={styles.burger_constructor} ref={dropRef}>
			{bun ? (
				<LockedBurgerConstructorItem
					item={bun}
					type='top'
					text={`${bun.name} (верх)`}
				/>
			) : (
				<PlaceholderBurgerConstructorItem type='top' text='Выберите булки' />
			)}

			<div className={styles.scroll_container}>
				{ingredients.length > 0 ? (
					ingredients.map((item, index) => (
						<DraggableBurgerConstructorItem
							key={item.uuid}
							item={item}
							text={item.name}
							index={index}
						/>
					))
				) : (
					<PlaceholderBurgerConstructorItem text='Выберите начинку' />
				)}
			</div>

			{bun ? (
				<LockedBurgerConstructorItem
					item={bun}
					type='bottom'
					text={`${bun.name} (низ)`}
				/>
			) : (
				<PlaceholderBurgerConstructorItem type='bottom' text='Выберите булки' />
			)}

			<div className={styles.order_confirmation}>
				<div className={styles.price}>
					<span className='text text_type_digits-medium'>{summ}</span>
					<CurrencyIcon />
				</div>
				<Button htmlType='button' onClick={handleOrderClick}>
					Оформить заказ
				</Button>
			</div>

			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};
