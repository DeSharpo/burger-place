import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import styles from './registration.module.css';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/user/user-slice';
import { useAppDispatch } from '@/services/hooks';

export const Registration = () => {
	const [nameValue, setNameValue] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');

	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onRegister = (e: FormEvent) => {
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
			.catch((err: Error) => {
				console.error('Ошибка регистрации:', err.message);
			});
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNameValue(e.target.value);
	};

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmailValue(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordValue(e.target.value);
	};

	return (
		<div className={styles.centeredWrapper}>
			<div className={styles.box}>
				<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
				<form className={styles.form} onSubmit={onRegister}>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={handleNameChange}
						value={nameValue}
						name={'name'}
						error={false}
						ref={inputRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass='mb-6'
					/>
					<EmailInput
						onChange={handleEmailChange}
						value={emailValue}
						name='email'
						isIcon={false}
						extraClass='mb-6'
					/>
					<PasswordInput
						onChange={handlePasswordChange}
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
