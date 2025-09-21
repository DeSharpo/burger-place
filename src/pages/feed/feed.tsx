import { OrderFeed } from '@components/order-feed/order-feed';
import { OrderStats } from '@components/order-stats/order-stats';
import styles from './feed.module.css';

export const Feed = () => {
	return (
		<>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Лента заказов
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<div className={styles.order_feed_container}>
					<OrderFeed />
				</div>
				<OrderStats />
			</main>
		</>
	);
};
