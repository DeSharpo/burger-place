import React, { useState, useRef } from 'react';
import styles from './reset-password.module.css';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
	const [nameValue, setNameValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const inputRef = useRef(null);

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
					onChange={(e) => setNameValue(e.target.value)}
					value={nameValue}
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
					extraClass='mb-20'>
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
