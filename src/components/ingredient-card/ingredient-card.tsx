import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { Ingredient } from '@/types/ingredient';
import { useAppSelector } from '@/services/hooks';

interface Props {
	item: Ingredient;
	onClick: (item: Ingredient) => void;
}

export const IngredientCard = ({ item, onClick }: Props) => {
	const location = useLocation();
	const ingredientId = item['_id'];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { counters } = useAppSelector((s) => (s as any).burgerIngredients) as {
		counters: Record<string, number>;
	};
	const count = counters[item._id] || 0;

	const [{ isDragging }, dragRef] = useDrag<
		Ingredient,
		unknown,
		{ isDragging: boolean }
	>({
		type: 'ingredient',
		item: item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<Link
			key={ingredientId}
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}
			className={styles.link}>
			<div
				ref={dragRef}
				onClick={() => onClick(item)}
				className={styles.card}
				style={{ opacity: isDragging ? 0.5 : 1 }}
				role='button'
				tabIndex={0}
				onKeyDown={(e) => e.key === 'Escape' && onClick(item)}>
				<img src={item.image} alt={item.name} />
				{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
				<div className={styles.price}>
					<span className={'text text_type_digits-default mr-2'}>
						{item.price}
					</span>
					<CurrencyIcon type={'primary'} />
				</div>
				<p className={`text text_type_main-default ${styles.name}`}>
					{item.name}
				</p>
			</div>
		</Link>
	);
};
