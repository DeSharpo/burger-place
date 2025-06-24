import React from 'react';
import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';

export const IngredientCard = ({ item }) => {
	return (
		<li className={styles.card}>
			<img src={item.image} alt={item.name} />
			<Counter count={1} size='default' extraClass='m-1' />
			<div className={styles.price}>
				<span className={'text text_type_digits-default mr-2'}>
					{item.price}
				</span>
				<CurrencyIcon />
			</div>
			<p className={`text text_type_main-default ${styles.name}`}>
				{item.name}
			</p>
		</li>
	);
};

IngredientCard.propTypes = {
	item: ingredientPropType.isRequired,
};
