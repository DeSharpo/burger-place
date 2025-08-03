import React, { useState, useRef, useEffect } from 'react';
import styles from './reset-password.module.css';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../utils/request';

export const ResetPassword = () => {
	const [passwordValue, setPasswordValue] = useState('');
	const [codeValue, setCodeValue] = useState('');

	const navigate = useNavigate();
	const inputRef = useRef(null);

	useEffect(() => {
		if (!localStorage.getItem('allowReset')) {
			navigate('/forgot-password');
		}
	}, [navigate]);

	const onSubmit = (e) => {
		e.preventDefault();
		request('/password-reset/reset', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password: passwordValue, token: codeValue }),
		}).then(() => {
			localStorage.removeItem('allowReset');
			navigate('/login');
		});
	};

	return (
		<div className={styles.centeredWrapper}>
			<div className={styles.box}>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<PasswordInput
					onChange={(e) => setPasswordValue(e.target.value)}
					value={passwordValue}
					name='password'
					placeholder='Введите новый пароль'
					extraClass='mb-6'
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={(e) => setCodeValue(e.target.value)}
					value={codeValue}
					name={'name'}
					error={false}
					ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mb-6'
				/>

				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='mb-20'
					onClick={onSubmit}>
					Сохранить
				</Button>
				<p className='text text_type_main-default text_color_inactive mb-4'>
					Вспомнили пароль?{' '}
					<Link to='/login' className={styles.link}>
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};
