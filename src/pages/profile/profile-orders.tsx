import { OrderFeed } from '@/components/order-feed/order-feed';
import styles from './profile.module.css';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
	profileOrdersConnect,
	profileOrdersDisconnect,
} from '@/services/profile-orders/profile-orders-slice';
import { useEffect } from 'react';

export const ProfileOrders = () => {
	const dispatch = useAppDispatch();
	const { orders } = useAppSelector((store) => store.profileOrders);
	const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');

	useEffect(() => {
		if (token) {
			dispatch(
				profileOrdersConnect(
					`wss://norma.nomoreparties.space/orders?token=${token}`
				)
			);
		}
		return () => {
			dispatch(profileOrdersDisconnect());
		};
	}, [dispatch, token]);

	return (
		<section className={styles.order_feed_container}>
			<OrderFeed orders={orders} />
		</section>
	);
};
