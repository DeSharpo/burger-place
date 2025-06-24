import React from 'react';
import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';

export const IngredientCard = ({ item, onClick }) => {
	return (
		<div
			className={styles.card}
			role='button'
			tabIndex={0}
			onClick={() => onClick(item)}
			onKeyDown={(e) => e.key === 'Escape' && onClick()}>
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
		</div>
	);
};

IngredientCard.propTypes = {
	item: ingredientPropType.isRequired,
};
