import { Order } from '@/types/order';
import styles from './order-card.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/services/hooks';
import { calculateOrderPrice } from '@/utils/calculate-order-price';

interface OrderCardProps {
	order: Order;
	onClick: (order: Order) => void;
}

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
	const { ingredients } = useAppSelector((state) => state.burgerIngredients);
	const price = calculateOrderPrice(order, ingredients);

	// преобразуем id → картинки
	const ingredientImages = order.ingredients
		.map((id) => ingredients.find((ing) => ing._id === id))
		.filter(Boolean)
		.map((ing) => ing!.image_mobile);

	const visibleIngredients = ingredientImages.slice(0, 6);
	const extra = ingredientImages.length - 6;

	const location = useLocation();
	const orderId = order.number;

	const isProfileOrders = location.pathname.startsWith('/profile/orders');
	const to = isProfileOrders
		? `/profile/orders/${orderId}`
		: `/feed/${orderId}`;

	const statusText =
		order.status === 'done'
			? 'Выполнен'
			: order.status === 'pending'
				? 'Готовится'
				: 'Создан';

	return (
		<Link
			key={orderId}
			to={to}
			state={{ background: location }}
			className={`${styles.link} ${styles.card}`}
			onClick={() => onClick(order)}>
			<div className={styles.header}>
				<p className='text text_type_digits-default mb-4'>#{order.number}</p>
				<FormattedDate
					className={styles.date}
					date={new Date(order.createdAt)}
				/>
			</div>
			<h3 className={styles.title}>{order.name}</h3>

			{isProfileOrders && (
				<p className='text text_type_main-small mb-4'>{statusText}</p>
			)}

			<div className={styles.footer}>
				<div className={styles.ingredients}>
					{visibleIngredients.map((src, i) => (
						<div key={i} className={styles.ingredient}>
							<img src={src} alt='' />
							{i === 5 && extra > 0 && (
								<div className={styles.overlay}>+{extra}</div>
							)}
						</div>
					))}
				</div>
				<div className={styles.price}>
					<span className='text text_type_digits-default'>{price}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</Link>
	);
};
