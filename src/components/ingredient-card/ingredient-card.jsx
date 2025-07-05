import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';

export const IngredientCard = ({ item, onClick }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient',
		item: item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div
			ref={dragRef}
			onClick={() => onClick(item)}
			className={styles.card}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			role='button'
			tabIndex={0}
			onKeyDown={(e) => e.key === 'Escape' && onClick()}>
			<img src={item.image} alt={item.name} />
			<Counter count={1} size='default' extraClass='m-1' />
			<div className={styles.price}>
				<span className={'text text_type_digits-default mr-2'}>
					{item.price}
				</span>
				<CurrencyIcon />
			</div>
			<p className={`text text_type_main-default ${styles.name}`}>
				{item.name}
			</p>
		</div>
	);
};

IngredientCard.propTypes = {
	item: ingredientPropType.isRequired,
};
