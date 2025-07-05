import React from 'react';
import styles from './burger-constructor-item.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export const PlaceholderBurgerConstructorItem = ({ type, text }) => {
	return (
		<div className={styles.constructor_element}>
			<div className={styles.icon_wrapper}></div>
			<ConstructorElement
				text={text}
				thumbnail={'constructor-item-placeholder.png'}
				type={type}
				isLocked={true}
			/>
		</div>
	);
};
