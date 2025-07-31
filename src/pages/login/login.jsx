import React, { useState } from 'react';
import styles from './login.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const Login = () => {
	const [emailValue, setEmailValue] = useState('bob@example.com');
	const [passwordValue, setPasswordValue] = useState('password');

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
					extraClass='mb-20'>
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
