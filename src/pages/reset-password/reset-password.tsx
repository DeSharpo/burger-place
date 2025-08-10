import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import styles from './reset-password.module.css';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../utils/request';

export const ResetPassword = () => {
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [codeValue, setCodeValue] = useState<string>('');

	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!localStorage.getItem('allowReset')) {
			navigate('/forgot-password');
		}
	}, [navigate]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordValue(e.target.value);
	};

	const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCodeValue(e.target.value);
	};

	return (
		<div className={styles.centeredWrapper}>
			<div className={styles.box}>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<form className={styles.form} onSubmit={onSubmit}>
					<PasswordInput
						onChange={handlePasswordChange}
						value={passwordValue}
						name='password'
						placeholder='Введите новый пароль'
						extraClass='mb-6'
					/>
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={handleCodeChange}
						value={codeValue}
						name={'name'}
						error={false}
						ref={inputRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass='mb-6'
					/>

					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Сохранить
					</Button>
				</form>
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
