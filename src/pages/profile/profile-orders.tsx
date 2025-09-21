import { OrderFeed } from '@/components/order-feed/order-feed';
import styles from './profile.module.css';

export const ProfileOrders = () => {
	return (
		<section className={styles.order_feed_container}>
			<OrderFeed />
		</section>
	);
};
