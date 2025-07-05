import React, { useEffect } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/burger-ingredients/burger-ingredients-slice';

export const App = () => {
	const dispatch = useDispatch();
	const { ingredients, status, error } = useSelector(
		(state) => state.burgerIngredients
	);

	useEffect(() => {
		console.log('старт запроса');
		dispatch(fetchIngredients());
	}, [dispatch]);

	if (status === 'idle' || status === 'loading') return <p>Загрузка...</p>;
	if (status === 'failed') return <p>Ошибка загрузки данных: {error}</p>;

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor />
			</main>
		</div>
	);
};
