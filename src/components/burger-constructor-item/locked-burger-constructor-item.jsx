import React from 'react';
import styles from './burger-constructor-item.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export const LockedBurgerConstructorItem = ({ item, type, text }) => {
	return (
		<div className={styles.constructor_element}>
			<div className={styles.icon_wrapper}></div>
			<ConstructorElement
				text={text}
				price={item.price}
				thumbnail={item.image}
				type={type}
				isLocked={true}
			/>
		</div>
	);
};

LockedBurgerConstructorItem.propTypes = {
	item: ingredientPropType.isRequired,
};
