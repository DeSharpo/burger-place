import React, { useState, useRef } from 'react';
import styles from './registration.module.css';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/user/user-slice';

export const Registration = () => {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onRegister = (e) => {
		e.preventDefault();
		dispatch(
			registerUser({
				name: nameValue,
				email: emailValue,
				password: passwordValue,
			})
		)
			.unwrap()
			.then(() => {
				navigate('/', { replace: true });
			})
			.catch((err) => {
				console.error('Ошибка регистрации:', err.message);
			});
	};

	return (
		<div className={styles.centeredWrapper}>
			<div className={styles.box}>
				<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
				<form className={styles.form} onSubmit={onRegister}>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={(e) => setNameValue(e.target.value)}
						value={nameValue}
						name={'name'}
						error={false}
						ref={inputRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass='mb-6'
					/>
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
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Зарегистрироваться
					</Button>
				</form>
				<p className='text text_type_main-default text_color_inactive mb-4'>
					Уже зарегистрированы?{' '}
					<Link to='/login' className={styles.link}>
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};
