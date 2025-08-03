import React, { useEffect, useState } from 'react';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../services/user/user-slice';

export const ProfileMain = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (!user) dispatch(getUser());
		else setForm({ name: user.name, email: user.email, password: '' });
	}, [dispatch, user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => {
			const updated = { ...prev, [name]: value };
			const dirty =
				updated.name !== user?.name ||
				updated.email !== user?.email ||
				updated.password !== '';
			setIsDirty(dirty);
			return updated;
		});
	};

	const handleCancel = () => {
		setForm({ name: user.name, email: user.email, password: '' });
		setIsDirty(false);
	};

	const handleSave = (e) => {
		e.preventDefault();
		const payload = {
			name: form.name,
			email: form.email,
		};
		if (form.password) payload.password = form.password;

		dispatch(updateUser(payload))
			.unwrap()
			.then(() => {
				setIsDirty(false);
				setForm((f) => ({ ...f, password: '' }));
			})
			.catch((err) => {
				console.error('Ошибка обновления профиля:', err.message);
			});
	};

	return (
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
	);
};
