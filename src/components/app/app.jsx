import React from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { API_URL } from '@utils/config';

export const App = () => {
	const [ingredients, setIngredients] = React.useState([]);
	const [hasError, setHasError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetch(API_URL)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Ошибка: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				setIngredients(data.data);
				setHasError(false);
			})
			.catch((err) => {
				console.error('Ошибка при загрузке ингредиентов:', err);
				setHasError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <p className='text text_type_main-medium mt-10 pl-5'>Загрузка...</p>;
	}

	if (hasError) {
		return (
			<p className='text text_type_main-medium mt-10 pl-5'>
				Ошибка загрузки данных
			</p>
		);
	}

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor ingredients={ingredients} />
			</main>
		</div>
	);
};
