import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Preloader } from '../preloader/preloader';
import { Home } from '../../pages/home/home.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/burger-ingredients/burger-ingredients-slice';
import { clearCurrentIngredient } from '../../services/ingredient-card/ingredient-card-slice';
import { Login } from '../../pages/login/login.jsx';
import { Registration } from '../../pages/registration/registration.jsx';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password.jsx';
import { ResetPassword } from '../../pages/reset-password/reset-password.jsx';
import { Profile } from '../../pages/profile/profile.jsx';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.burgerIngredients);

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
			<Routes location={background || location}>
				<Route path='/' element={<Home />} />
				<Route
					path='/ingredients/:ingredientId'
					element={
						<div className={styles.centered_wrapper}>
							<IngredientDetails title='Детали ингредиента' />
						</div>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Registration />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='/profile' element={<Profile />} />
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
		</div>
	);
};
