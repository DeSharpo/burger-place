import React from 'react';
import styles from './burger-constructor-item.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const DraggableBurgerConstructorItem = ({ item, type, text }) => {
	return (
		<div className={styles.constructor_element}>
			<div className={styles.icon_wrapper}>
				<DragIcon />
			</div>
			<ConstructorElement
				text={text}
				price={item.price}
				thumbnail={item.image}
				type={type}
				isLocked={false}
			/>
		</div>
	);
};

DraggableBurgerConstructorItem.propTypes = {
	item: ingredientPropType.isRequired,
};
