import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styles from './profile.module.css';

import { logoutUser } from '../../services/user/user-slice';
import { useAppDispatch } from '@/services/hooks';

export const ProfileLayout = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = (): void => {
		dispatch(logoutUser())
			.unwrap()
			.then(() => {
				navigate('/login', { replace: true });
			});
	};

	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<NavLink
					to='/profile'
					end
					className={({ isActive }) =>
						isActive ? styles.link_active : styles.link
					}>
					<p className='text text_type_main-medium mb-5'>Профиль</p>
				</NavLink>

				<NavLink
					to='/profile/orders'
					className={({ isActive }) =>
						isActive ? styles.link_active : styles.link
					}>
					<p className='text text_type_main-medium mb-5'>История заказов</p>
				</NavLink>

				<button type='button' onClick={handleLogout} className={styles.link}>
					<p className='text text_type_main-medium mb-5'>Выход</p>
				</button>

				<p className='text text_type_main-small text_color_inactive mt-30'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav>
			<Outlet /> {/* ← тут будут показываться вложенные компоненты */}
		</div>
	);
};
