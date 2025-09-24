import { OrderFeed } from '@components/order-feed/order-feed';
import { OrderStats } from '@components/order-stats/order-stats';
import styles from './feed.module.css';
import {
	orderFeedConnect,
	orderFeedDisconnect,
} from '@/services/order-feed/order-feed-slice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

export const Feed = () => {
	const dispatch = useAppDispatch();
	const { orders, total, totalToday } = useAppSelector((s) => s.orderFeed);

	useEffect(() => {
		dispatch(orderFeedConnect('wss://norma.nomoreparties.space/orders/all'));
		return () => {
			dispatch(orderFeedDisconnect());
		};
	}, [dispatch]);

	return (
		<>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Лента заказов
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<div className={styles.order_feed_container}>
					<OrderFeed orders={orders} />
				</div>
				<OrderStats total={total} totalToday={totalToday} orders={orders} />
			</main>
		</>
	);
};
