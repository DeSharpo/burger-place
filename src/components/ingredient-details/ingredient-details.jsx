import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientPropType } from '@utils/prop-types.js';

export const IngredientDetails = ({ item }) => {
	if (!item) return null;

	return (
		<div className={styles.content}>
			<img src={item.image_large} alt={item.name} className={styles.image} />
			<p className={`text text_type_main-medium ${styles.name}`}>{item.name}</p>
			<div className={styles.nutrients}>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default'>Калории, ккал</span>
					<span className={`text text_type_digits-default ${styles.value}`}>
						{item.calories}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default'>Белки, г</span>
					<span className={`text text_type_digits-default ${styles.value}`}>
						{item.proteins}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default'>Жиры, г</span>
					<span className={`text text_type_digits-default ${styles.value}`}>
						{item.fat}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default'>Углеводы, г</span>
					<span className={`text text_type_digits-default ${styles.value}`}>
						{item.carbohydrates}
					</span>
				</div>
			</div>
		</div>
	);
};

IngredientDetails.propTypes = {
	item: ingredientPropType.isRequired,
};
