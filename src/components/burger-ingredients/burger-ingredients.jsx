import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';
import { IngredientCard } from '@components/ingredient-card/ingredient-card';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

export const BurgerIngredients = ({ ingredients }) => {
	console.log(ingredients);

	const [selectedIngredient, setSelectedIngredient] = useState(null);

	const buns = ingredients.filter((i) => i.type === 'bun');
	const sauces = ingredients.filter((i) => i.type === 'sauce');
	const mains = ingredients.filter((i) => i.type === 'main');

	const handleCardClick = (item) => {
		setSelectedIngredient(item);
	};

	const closeModal = () => {
		setSelectedIngredient(null);
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
				</ul>
			</nav>

			<div className={styles.scroll_container}>
				<h2 className='text text_type_main-large mb-5'>Булки</h2>
				<ul className={styles.list}>
					{buns.map((item) => (
						<IngredientCard
							key={item._id}
							item={item}
							onClick={handleCardClick}
						/>
					))}
				</ul>

				<h2 className='text text_type_main-large mb-5 mt-15'>Соусы</h2>
				<ul className={styles.list}>
					{sauces.map((item) => (
						<IngredientCard
							key={item._id}
							item={item}
							onClick={handleCardClick}
						/>
					))}
				</ul>

				<h2 className='text text_type_main-large mb-5 mt-15'>Начинки</h2>
				<ul className={styles.list}>
					{mains.map((item) => (
						<IngredientCard
							key={item._id}
							item={item}
							onClick={handleCardClick}
						/>
					))}
				</ul>
				{selectedIngredient && (
					<Modal title='Детали ингредиента' onClose={closeModal}>
						<IngredientDetails item={selectedIngredient} />
					</Modal>
				)}
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
