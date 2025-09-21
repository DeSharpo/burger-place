import { Order } from '@/types/order';
import styles from './order-card.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

interface OrderCardProps {
	order: {
		number: number;
		date: string;
		name: string;
		price: number;
		ingredients: string[];
	};
	onClick: (order: Order) => void;
}

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
	const visibleIngredients = order.ingredients.slice(0, 6);
	const extra = order.ingredients.length - 6;

	const location = useLocation();
	const orderId = order.number;

	const isProfileOrders = location.pathname.startsWith('/profile/orders');
	const to = isProfileOrders
		? `/profile/orders/${orderId}`
		: `/feed/${orderId}`;

	return (
		<Link
			key={orderId}
			to={to}
			state={{ background: location }}
			className={styles.link}>
			<div
				className={styles.card}
				onClick={() => onClick(order)}
				role='button'
				tabIndex={0}
				onKeyDown={(e) => e.key === 'Escape' && onClick(order)}>
				<div className={styles.header}>
					<p className='text text_type_digits-default mb-4'>#{order.number}</p>
					<FormattedDate className={styles.date} date={new Date(order.date)} />
				</div>
				<h3 className={styles.title}>{order.name}</h3>
				{isProfileOrders && (
					<p className='text text_type_main-small mb-4'>Готов</p>
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
						<span className={`text text_type_digits-default ${styles.price}`}>
							{order.price}
						</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</Link>
	);
};
