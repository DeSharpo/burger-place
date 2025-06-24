import React from 'react';
//import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ item }) => {
	if (!item) return null;

	return (
		<div>
			<img src={item.image_large} alt={item.name} className='mb-4' />
			<p className='text text_type_main-medium mb-4'>{item.name}</p>
			<ul>
				<li>
					Калории, ккал <span>{item.calories}</span>
				</li>
				<li>
					Белки, г <span>{item.proteins}</span>
				</li>
				<li>
					Жиры, г <span>{item.fat}</span>
				</li>
				<li>
					Углеводы, г <span>{item.carbohydrates}</span>
				</li>
			</ul>
		</div>
	);
};
