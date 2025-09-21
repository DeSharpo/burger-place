import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Preloader } from '../preloader/preloader';
import { Home } from '../../pages/home/home';
import { fetchIngredients } from '../../services/burger-ingredients/burger-ingredients-slice';
import { clearCurrentIngredient } from '../../services/ingredient-card/ingredient-card-slice';
import { clearCurrentOrder } from '@/services/order-card/order-card-slice.js';
import { Login } from '../../pages/login/login';
import { Registration } from '../../pages/registration/registration';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { getUser, setAuthChecked } from '../../services/user/user-slice.js';
import { ProfileLayout } from '../../pages/profile/profile-layout';
import { ProfileMain } from '../../pages/profile/profile-main';
import { ProfileOrders } from '../../pages/profile/profile-orders';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { Feed } from '@/pages/feed/feed';
import { OrderFeedDetails } from '../order-feed-details/order-feed-details.js';

type LocationState = { background?: Location };

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const state = location.state as LocationState | undefined;
	const background = state?.background;

	const dispatch = useAppDispatch();
	const { status, error } = useAppSelector(
		(store) => store.burgerIngredients ?? { status: 'idle', error: null }
	);

	const handleModalIngredientClose = () => {
		dispatch(clearCurrentIngredient());
		navigate(-1);
	};

	const handleModalOrderClose = () => {
		dispatch(clearCurrentOrder());
		navigate(-1);
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			dispatch(getUser()).finally(() => {
				dispatch(setAuthChecked(true));
			});
		} else {
			dispatch(setAuthChecked(true));
		}
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
				<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
				<Route
					path='/register'
					element={<OnlyUnAuth component={<Registration />} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnAuth component={<ResetPassword />} />}
				/>
				<Route
					path='/profile'
					element={<OnlyAuth component={<ProfileLayout />} />}>
					<Route index element={<ProfileMain />} />
					<Route path='orders' element={<ProfileOrders />} />
					<Route path='orders/:orderId' element={<OrderFeedDetails />} />
				</Route>
				<Route path='/feed' element={<Feed />} />
				<Route
					path='/feed/:orderId'
					element={
						<div className={styles.centered_wrapper}>
							<OrderFeedDetails />
						</div>
					}
				/>
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal
								onClose={handleModalIngredientClose}
								title={'Детали ингредиента'}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/feed/:orderId'
						element={
							<Modal onClose={handleModalOrderClose}>
								<OrderFeedDetails />
							</Modal>
						}
					/>
					<Route
						path='profile/orders/:orderId'
						element={
							<Modal onClose={handleModalOrderClose}>
								<OrderFeedDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
