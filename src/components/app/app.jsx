import React, { useEffect } from 'react';
import {
	Routes,
	Route,
	useLocation,
	useNavigate,
	useMatch,
} from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Preloader } from '../preloader/preloader';
import { Home } from '../../pages/home/home.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/burger-ingredients/burger-ingredients-slice';
import { clearCurrentIngredient } from '../../services/ingredient-card/ingredient-card-slice';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.burgerIngredients);

	const matchDetail = useMatch('/ingredients/:ingredientId');
	const fullPageDetail = Boolean(matchDetail && !background);

	const handleModalClose = () => {
		dispatch(clearCurrentIngredient());
		navigate(-1);
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	if (status === 'idle' || status === 'loading') return <Preloader />;
	if (status === 'failed') return <p>Ошибка загрузки данных: {error}</p>;

	return (
		<div className={styles.app}>
			<AppHeader />
			{!fullPageDetail && (
				<h1
					className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
					Соберите бургер
				</h1>
			)}
			<main
				className={`${styles.main} pl-5 pr-5
							${fullPageDetail ? styles.main_centered : ''}`}>
				<Routes location={background || location}>
					<Route path='/' element={<Home />} />
					<Route
						path='/ingredients/:ingredientId'
						element={<IngredientDetails title={'Детали ингредиента'} />}
					/>
				</Routes>

				{background && (
					<Routes>
						<Route
							path='/ingredients/:ingredientId'
							element={
								<Modal onClose={handleModalClose} title={'Детали ингредиента'}>
									<IngredientDetails />
								</Modal>
							}
						/>
					</Routes>
				)}
			</main>
		</div>
	);
};
