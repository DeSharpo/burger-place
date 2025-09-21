import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
	fetchOrderByNumber,
	clearCurrentOrder,
} from '@/services/order-info/order-info-slice';

export const OrderFeedDetails = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const dispatch = useAppDispatch();
	const { currentOrder, loading, error } = useAppSelector((s) => s.orderInfo);

	useEffect(() => {
		if (orderId) {
			dispatch(fetchOrderByNumber(Number(orderId)));
		}
		return () => {
			dispatch(clearCurrentOrder());
		};
	}, [dispatch, orderId]);

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>{error}</p>;
	if (!currentOrder) return null;

	return (
		<div>
			<h2>Заказ #{currentOrder.number}</h2>
			<p>Статус: {currentOrder.status}</p>
		</div>
	);
};
