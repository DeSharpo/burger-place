import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from '@components/ingredient-card/ingredient-card';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

export const BurgerIngredients = () => {
	const { ingredients } = useSelector((state) => state.burgerIngredients);
	console.log(ingredients);

	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [currentTab, setCurrentTab] = useState('bun');

	const containerRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	const buns = ingredients.filter((i) => i.type === 'bun');
	const sauces = ingredients.filter((i) => i.type === 'sauce');
	const mains = ingredients.filter((i) => i.type === 'main');

	const handleCardClick = (item) => {
		setSelectedIngredient(item);
	};

	const closeModal = () => {
		setSelectedIngredient(null);
	};

	const handleScroll = () => {
		const containerTop = containerRef.current.getBoundingClientRect().top;

		const distances = [
			{ type: 'bun', top: bunRef.current.getBoundingClientRect().top },
			{ type: 'sauce', top: sauceRef.current.getBoundingClientRect().top },
			{ type: 'main', top: mainRef.current.getBoundingClientRect().top },
		];

		const closest = distances.reduce((prev, curr) =>
			Math.abs(curr.top - containerTop) < Math.abs(prev.top - containerTop)
				? curr
				: prev
		);

		setCurrentTab(closest.type);
	};

	const scrollTo = (type) => {
		setCurrentTab(type);
		const element = {
			bun: bunRef,
			sauce: sauceRef,
			main: mainRef,
		}[type];
		element?.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={currentTab === 'bun'}
						onClick={() => scrollTo('bun')}>
						Булки
					</Tab>
					<Tab
						value='sauce'
						active={currentTab === 'sauce'}
						onClick={() => scrollTo('sauce')}>
						Соусы
					</Tab>
					<Tab
						value='main'
						active={currentTab === 'main'}
						onClick={() => scrollTo('main')}>
						Начинки
					</Tab>
				</ul>
			</nav>

			<div className={styles.scroll_container} ref={containerRef}>
				<h2 ref={bunRef} className='text text_type_main-large mb-5'>
					Булки
				</h2>
				<ul className={styles.list}>
					{buns.map((item) => (
						<IngredientCard
							key={item._id}
							item={item}
							onClick={handleCardClick}
						/>
					))}
				</ul>

				<h2 ref={sauceRef} className='text text_type_main-large mb-5 mt-15'>
					Соусы
				</h2>
				<ul className={styles.list}>
					{sauces.map((item) => (
						<IngredientCard
							key={item._id}
							item={item}
							onClick={handleCardClick}
						/>
					))}
				</ul>

				<h2 ref={mainRef} className='text text_type_main-large mb-5 mt-15'>
					Начинки
				</h2>
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
