import { ReactNode, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
	fetchOrderByNumber,
	clearCurrentOrder,
} from '@/services/order-info/order-info-slice';
import {
	FormattedDate,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-feed-details.module.css';
import { calculateOrderPrice } from '@/utils/calculate-order-price';
import { Ingredient } from '@/types/ingredient';

interface Props {
	title?: ReactNode;
}

export const OrderFeedDetails = ({ title }: Props) => {
	const { orderId } = useParams<{ orderId: string }>();
	const dispatch = useAppDispatch();
	const { currentOrder, loading, error } = useAppSelector(
		(store) => store.orderInfo
	);
	const { ingredients } = useAppSelector((store) => store.burgerIngredients);

	useEffect(() => {
		if (orderId) {
			dispatch(fetchOrderByNumber(orderId));
		}
		return () => {
			dispatch(clearCurrentOrder());
		};
	}, [dispatch, orderId]);

	const orderIngredients = useMemo(() => {
		if (!currentOrder) return [];
		return currentOrder.ingredients
			.map((id) => ingredients.find((ing) => ing._id === id))
			.filter(Boolean);
	}, [currentOrder, ingredients]);

	const groupedIngredients = useMemo(() => {
		const counts: Record<string, { ingredient: Ingredient; qty: number }> = {};
		orderIngredients.forEach((ing) => {
			if (!ing) return;
			if (!counts[ing._id]) {
				counts[ing._id] = { ingredient: ing, qty: 0 };
			}
			counts[ing._id].qty++;
		});
		return Object.values(counts);
	}, [orderIngredients]);

	const totalPrice = currentOrder
		? calculateOrderPrice(currentOrder, ingredients)
		: 0;

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>{error}</p>;
	if (!currentOrder) return null;

	const statusText =
		currentOrder.status === 'done'
			? 'Выполнен'
			: currentOrder.status === 'pending'
				? 'Готовится'
				: 'Создан';

	return (
		<div className={styles.container}>
			{title && (
				<h1 className='text text_type_main-medium mb-2 mt-6'>{title}</h1>
			)}
			<h2 className='text text_type_main-medium'>{currentOrder.name}</h2>
			<p
				className={`text text_type_main-default mb-6 ${
					statusText === 'Выполнен' ? styles.status_done : ''
				}`}>
				{statusText}
			</p>

			<h3 className='text text_type_main-medium mb-6'>Состав:</h3>
			<ul className={styles.ingredients}>
				{groupedIngredients.map(({ ingredient, qty }) => (
					<li key={ingredient._id} className={styles.ingredient}>
						<div className={styles.imageWrapper}>
							<img src={ingredient.image_mobile} alt={ingredient.name} />
						</div>
						<p className='text text_type_main-default'>{ingredient.name}</p>
						<div className={styles.price}>
							<span className='text text_type_digits-default'>
								{qty} x {ingredient.price}
							</span>
							<CurrencyIcon type='primary' />
						</div>
					</li>
				))}
			</ul>

			<div className={styles.footer}>
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(currentOrder.createdAt)}
				/>
				<div className={styles.total}>
					<span className='text text_type_digits-default'>{totalPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
