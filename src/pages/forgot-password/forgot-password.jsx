import React, { useState } from 'react';
import styles from './forgot-password.module.css';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
	const [emailValue, setEmailValue] = useState('');

	return (
		<div className={styles.centeredWrapper}>
			<div className={styles.box}>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<EmailInput
					onChange={(e) => setEmailValue(e.target.value)}
					value={emailValue}
					name='email'
					isIcon={false}
					placeholder='Укажите e-mail'
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
					Вспомнили пароль?{' '}
					<Link to='/login' className={styles.link}>
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};
