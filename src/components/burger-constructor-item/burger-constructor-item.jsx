import React from 'react';
import styles from './burger-constructor-item.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructorItem = ({ item, type, isLocked, text }) => {
	let showDrag = !isLocked && !type;

	return (
		<div className={styles.constructor_element}>
			<div className={styles.icon_wrapper}>{showDrag && <DragIcon />}</div>
			<ConstructorElement
				text={text}
				price={item.price}
				thumbnail={item.image || 'constructor-item-placeholder.png'}
				type={type}
				isLocked={isLocked}
			/>
		</div>
	);
};

BurgerConstructorItem.propTypes = {
	item: ingredientPropType.isRequired,
};
