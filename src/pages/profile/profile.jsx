import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';

export const Profile = () => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [isDirty, setIsDirty] = useState(false);

	const handleChange = (e) => {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
		setIsDirty(true);
	};
	const handleCancel = () => setIsDirty(false);
	const handleSave = (e) => {
		e.preventDefault();
		setIsDirty(false);
	};
	const handleLogout = () => {
		/* dispatch(logout()) */
	};

	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<NavLink
					to='/profile'
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

			<form className={styles.form} onSubmit={handleSave}>
				<Input
					placeholder='Имя'
					icon='EditIcon'
					name='name'
					value={form.name}
					onChange={handleChange}
					extraClass='mb-6'
				/>

				<EmailInput
					name='email'
					value={form.email}
					onChange={handleChange}
					icon='EditIcon'
					extraClass='mb-6'
				/>

				<PasswordInput
					name='password'
					value={form.password}
					onChange={handleChange}
					icon='EditIcon'
					extraClass='mb-6'
				/>

				{isDirty && (
					<div className={styles.buttons}>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							extraClass='mr-6'
							onClick={handleCancel}>
							Отмена
						</Button>
						<Button htmlType='submit' type='primary' size='medium'>
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</div>
	);
};
