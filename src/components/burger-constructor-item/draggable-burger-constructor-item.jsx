import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styles from './burger-constructor-item.module.css';
import { moveIngredient } from '../../services/burger-constructor/burger-constructor-slice';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const DraggableBurgerConstructorItem = ({ item, index }) => {
	const ref = useRef(null);
	const dispatch = useDispatch();

	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient-sortable',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop({
		accept: 'ingredient-sortable',
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				dispatch(
					moveIngredient({ fromIndex: draggedItem.index, toIndex: index })
				);
				draggedItem.index = index;
			}
		},
	});

	dragRef(dropRef(ref));

	return (
		<div
			ref={ref}
			className={styles.constructor_element}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			<div className={styles.icon_wrapper}>
				<DragIcon />
			</div>
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
				isLocked={false}
			/>
		</div>
	);
};

DraggableBurgerConstructorItem.propTypes = {
	item: ingredientPropType.isRequired,
};
