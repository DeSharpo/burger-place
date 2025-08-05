import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';

export const IngredientDetails = ({ title }) => {
	const { currentIngredient } = useSelector((state) => state.ingredientCard);
	const { ingredients } = useSelector((state) => state.burgerIngredients);
	const { ingredientId } = useParams();

	const foundIngredient = ingredients.find((item) => item._id === ingredientId);
	const ingredient = currentIngredient || foundIngredient;

	if (!ingredient) return null;

	return (
		<div className={styles.content}>
			{title && (
				<h1 className={'text text_type_main-large mt-10 mb-5 pl-5'}>{title}</h1>
			)}
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
