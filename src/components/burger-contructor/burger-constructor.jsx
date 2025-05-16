import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { BurgerConstructorItem } from '@components/burger-constructor-item/burger-constructor-item';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ ingredients }) => {
	const lastIndex = ingredients.length - 1;
	const top = ingredients[0];
	const bottom = ingredients[lastIndex];
	const middle = ingredients.slice(1, lastIndex);
	const summ = ingredients.reduce((acc, item) => acc + item.price, 0);

	return (
		<section className={styles.burger_constructor}>
			<BurgerConstructorItem item={top} type='top' isLocked={true} />

			<div className={styles.scroll_container}>
				{middle.map((item) => (
					<BurgerConstructorItem key={item._id} item={item} />
				))}
			</div>

			<BurgerConstructorItem item={bottom} type='bottom' isLocked={true} />

			<div className={styles.order_confirmation}>
				<div className={styles.price}>
					<span className='text text_type_digits-medium'>{summ}</span>
					<CurrencyIcon />
				</div>
				<Button>Оформить заказ</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
