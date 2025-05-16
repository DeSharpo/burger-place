import React from 'react';
import styles from './ingredient-card.module.css';

export const IngredientCard = ({ item }) => {
	return (
		<li className={styles.card}>
			<img src={item.image} alt={item.name} className={styles.image} />
			<div className={styles.price}>
				<span className='text text_type_digits-default mr-2'>{item.price}</span>
			</div>
			<p className={`text text_type_main-default ${styles.name}`}>
				{item.name}
			</p>
		</li>
	);
};
