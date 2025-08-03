import React, { useState } from 'react';
import styles from './login.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/user/user-slice';

export const Login = () => {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const onLogin = (e) => {
		e.preventDefault();
		dispatch(loginUser({ email: emailValue, password: passwordValue }))
			.unwrap()
			.then(() => {
				navigate(from, { replace: true });
			})
			.catch((err) => {
				console.error('Ошибка авторизации:', err.message);
			});
	};

	return (
		<div className={styles.centeredWrapper}>
			<div className={styles.box}>
				<h1 className='text text_type_main-medium mb-6'>Вход</h1>
				<EmailInput
					onChange={(e) => setEmailValue(e.target.value)}
					value={emailValue}
					name='email'
					isIcon={false}
					extraClass='mb-6'
				/>
				<PasswordInput
					onChange={(e) => setPasswordValue(e.target.value)}
					value={passwordValue}
					name='password'
					extraClass='mb-6'
				/>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='mb-20'
					onClick={onLogin}>
					Войти
				</Button>
				<p className='text text_type_main-default text_color_inactive mb-4'>
					Вы — новый пользователь?{' '}
					<Link to='/register' className={styles.link}>
						Зарегистрироваться
					</Link>
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Забыли пароль?{' '}
					<Link to='/forgot-password' className={styles.link}>
						Восстановить пароль
					</Link>
				</p>
			</div>
		</div>
	);
};
