import { Middleware } from '@reduxjs/toolkit';
import {
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetOrders,
	profileOrdersConnect,
	profileOrdersDisconnect,
} from './profile-orders-slice';
import { refreshToken } from '@/utils/request';

export const createProfileOrdersMiddleware = (): Middleware => {
	return (store) => {
		let socket: WebSocket | null = null;

		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (next) => async (action: any) => {
			const { dispatch } = store;

			if (profileOrdersConnect.match(action)) {
				socket = new WebSocket(action.payload);

				socket.onopen = () => dispatch(wsConnectionSuccess());
				socket.onerror = () => dispatch(wsConnectionError('Ошибка соединения'));

				socket.onmessage = async (event) => {
					try {
						const data = JSON.parse(event.data);

						if (data.message === 'Invalid or missing token') {
							try {
								const res = await refreshToken();
								const newUrl = action.payload.replace(
									/\?token=.*/,
									`?token=${res.accessToken}`
								);
								dispatch(profileOrdersConnect(newUrl));
							} catch {
								dispatch(wsConnectionError('Токен устарел, войдите снова'));
								socket?.close();
							}
							return;
						}

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

			if (profileOrdersDisconnect.match(action) && socket) {
				socket.close();
			}

			return next(action);
		};
	};
};
