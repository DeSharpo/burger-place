import { OrderCard } from '@components/order-card/order-card';
import styles from './order-feed.module.css';
import type { Order } from '@/types/order';
import { setCurrentOrder } from '@/services/order-card/order-card-slice';
import { useAppDispatch } from '@/services/hooks';

interface OrderFeedProps {
	orders: Order[];
}

export const OrderFeed = ({ orders }: OrderFeedProps) => {
	const dispatch = useAppDispatch();

	const handleCardClick = (order: Order) => {
		dispatch(setCurrentOrder(order));
	};

	return (
		<section className={styles.order_feed}>
			{orders.map((order) => (
				<OrderCard key={order._id} order={order} onClick={handleCardClick} />
			))}
		</section>
	);
};
