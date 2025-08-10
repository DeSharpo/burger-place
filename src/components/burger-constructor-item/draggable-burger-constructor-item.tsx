import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor-item.module.css';
import {
	moveIngredient,
	removeIngredient,
} from '../../services/burger-constructor/burger-constructor-slice';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { Ingredient } from '@/types/ingredient';
import { useAppDispatch } from '@/services/hooks';

type Props = {
	item: Ingredient & { uuid: string };
	index: number;
};

type DragItem = {
	index: number;
};

type DragCollected = {
	isDragging: boolean;
};

export const DraggableBurgerConstructorItem = ({ item, index }: Props) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const dispatch = useAppDispatch();

	const [{ isDragging }, dragRef] = useDrag<DragItem, unknown, DragCollected>({
		type: 'ingredient-sortable',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop<DragItem, void, unknown>({
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
				<DragIcon type='primary' />
			</div>
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
				isLocked={false}
				handleClose={() => dispatch(removeIngredient(item.uuid))}
			/>
		</div>
	);
};
