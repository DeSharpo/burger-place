import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { Preloader } from '../preloader/preloader';
import { Home } from '../../pages/home/home.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/burger-ingredients/burger-ingredients-slice';

export const App = () => {
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.burgerIngredients);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	if (status === 'idle' || status === 'loading') return <Preloader />;
	if (status === 'failed') return <p>Ошибка загрузки данных: {error}</p>;

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</main>
		</div>
	);
};
