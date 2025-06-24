import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { BurgerConstructorItem } from '@components/burger-constructor-item/burger-constructor-item';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';

export const BurgerConstructor = ({ ingredients }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const top = ingredients[0];
	const bottom = top;
	const middle = ingredients.slice(1);
	const summ = 610;

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<section className={styles.burger_constructor}>
			<BurgerConstructorItem
				item={top}
				type='top'
				isLocked={true}
				text={`${top.name} (верх)`}
			/>

			<div className={styles.scroll_container}>
				{middle.map((item) => (
					<BurgerConstructorItem key={item._id} item={item} text={item.name} />
				))}
			</div>

			<BurgerConstructorItem
				item={bottom}
				type='bottom'
				isLocked={true}
				text={`${bottom.name} (низ)`}
			/>

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

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
