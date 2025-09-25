import { Middleware } from '@reduxjs/toolkit';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WsActions {
	connect: string;
	disconnect: string;
	onOpen: () => any;
	onClose: () => any;
	onError: (err: string) => any;
	onMessage: (data: any) => any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const createSocketMiddleware = (wsActions: WsActions): Middleware => {
	return (store) => {
		let socket: WebSocket | null = null;

		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (next) => (action: any) => {
			const { dispatch } = store;

			if (action.type === wsActions.connect) {
				const url = action.payload;
				socket = new WebSocket(url);
			}

			if (socket) {
				socket.onopen = () => dispatch(wsActions.onOpen());
				socket.onclose = () => dispatch(wsActions.onClose());
				socket.onerror = () => dispatch(wsActions.onError('Ошибка соединения'));
				socket.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);
						dispatch(wsActions.onMessage(data));
					} catch (err) {
						console.error('Ошибка парсинга данных', err);
					}
				};

				if (action.type === wsActions.disconnect) {
					socket.close();
				}
			}

			return next(action);
		};
	};
};
