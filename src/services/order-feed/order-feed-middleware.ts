import { Middleware } from '@reduxjs/toolkit';
import {
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetOrders,
	orderFeedConnect,
	orderFeedDisconnect,
} from './order-feed-slice';

export const createOrderFeedMiddleware = (): Middleware => {
	return (store) => {
		let socket: WebSocket | null = null;

		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (next) => (action: any) => {
			const { dispatch } = store;

			if (orderFeedConnect.match(action)) {
				socket = new WebSocket(action.payload);

				socket.onopen = () => dispatch(wsConnectionSuccess());
				socket.onerror = () => dispatch(wsConnectionError('Ошибка соединения'));

				socket.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);
						if (data.success) {
							dispatch(
								wsGetOrders({
									orders: data.orders,
									total: data.total,
									totalToday: data.totalToday,
								})
							);
						} else {
							dispatch(wsConnectionError('Ошибка данных от сервера'));
						}
					} catch {
						dispatch(wsConnectionError('Ошибка парсинга данных'));
					}
				};

				socket.onclose = () => dispatch(wsConnectionClosed());
			}

			if (orderFeedDisconnect.match(action) && socket) {
				socket.close();
			}

			return next(action);
		};
	};
};
