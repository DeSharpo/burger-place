import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../../services/burger-constructor/burger-constructor-slice';
import { useDrop } from 'react-dnd';
import { BurgerConstructorItem } from '@components/burger-constructor-item/burger-constructor-item';
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

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

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

	return (
		<section className={styles.burger_constructor} ref={dropRef}>
			{bun ? (
				<BurgerConstructorItem
					item={bun}
					type='top'
					isLocked={true}
					text={`${bun.name} (верх)`}
				/>
			) : (
				<BurgerConstructorItem
					item={{}}
					type='top'
					isLocked={true}
					text='Выберите булки'
				/>
			)}

			<div className={styles.scroll_container}>
				{ingredients.length > 0 ? (
					ingredients.map((item) => (
						<BurgerConstructorItem
							key={item.uuid}
							item={item}
							isLocked={false}
							text={item.name}
						/>
					))
				) : (
					<BurgerConstructorItem item={{}} text='Выберите начинку' />
				)}
			</div>

			{bun ? (
				<BurgerConstructorItem
					item={bun}
					type='bottom'
					isLocked={true}
					text={`${bun.name} (низ)`}
				/>
			) : (
				<BurgerConstructorItem
					item={{}}
					type='bottom'
					isLocked={true}
					text='Выберите булки'
				/>
			)}

			<div className={styles.order_confirmation}>
				<div className={styles.price}>
					<span className='text text_type_digits-medium'>{summ}</span>
					<CurrencyIcon />
				</div>
				<Button htmlType='button' onClick={openModal}>
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
