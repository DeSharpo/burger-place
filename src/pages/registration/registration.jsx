import React, { useState, useRef } from 'react';
import styles from './registration.module.css';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const Registration = () => {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const inputRef = useRef(null);

	return (
		<div className={styles.centeredWrapper}>
			<div className={styles.box}>
				<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
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
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='mb-20'>
					Зарегистрироваться
				</Button>
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
