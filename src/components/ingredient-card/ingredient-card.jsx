import React from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';

export const IngredientCard = ({ item, onClick }) => {
	const { counters } = useSelector((state) => state.burgerIngredients);
	const count = counters[item._id] || 0;

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
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
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
