import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
	const { ingredient } = useSelector((state) => state.ingredientCard);
	if (!ingredient) return null;

	return (
		<div className={styles.content}>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className={styles.image}
			/>
			<p className={`text text_type_main-medium ${styles.name}`}>
				{ingredient.name}
			</p>
			<div className={styles.nutrients}>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default'>Калории, ккал</span>
					<span className={`text text_type_digits-default ${styles.value}`}>
						{ingredient.calories}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default'>Белки, г</span>
					<span className={`text text_type_digits-default ${styles.value}`}>
						{ingredient.proteins}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default'>Жиры, г</span>
					<span className={`text text_type_digits-default ${styles.value}`}>
						{ingredient.fat}
					</span>
				</div>
				<div className={styles.nutrient}>
					<span className='text text_type_main-default'>Углеводы, г</span>
					<span className={`text text_type_digits-default ${styles.value}`}>
						{ingredient.carbohydrates}
					</span>
				</div>
			</div>
		</div>
	);
};
