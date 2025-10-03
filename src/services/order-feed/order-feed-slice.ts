import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Order } from '@/types/order';

interface OrderFeedState {
	orders: Order[];
	total: number;
	totalToday: number;
	loading: boolean;
	error: string | null;
}

export const initialState: OrderFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	loading: false,
	error: null,
};

export const orderFeedConnect = createAction<string>('orderFeed/connect');
export const orderFeedDisconnect = createAction('orderFeed/disconnect');

const orderFeedSlice = createSlice({
	name: 'orderFeed',
	initialState,
	reducers: {
		wsConnectionSuccess: (state) => {
			state.error = null;
		},
		wsConnectionError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		wsConnectionClosed: (state) => {
			state.orders = [];
			state.total = 0;
			state.totalToday = 0;
		},
		wsGetOrders: (
			state,
			action: PayloadAction<{
				orders: Order[];
				total: number;
				totalToday: number;
			}>
		) => {
			state.orders = action.payload.orders;
			state.total = action.payload.total;
			state.totalToday = action.payload.totalToday;
		},
	},
});

export const {
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetOrders,
} = orderFeedSlice.actions;

export const orderFeedActions = {
	connect: orderFeedConnect.type,
	disconnect: orderFeedDisconnect.type,
	onOpen: wsConnectionSuccess,
	onClose: wsConnectionClosed,
	onError: wsConnectionError,
	onMessage: wsGetOrders,
};

export default orderFeedSlice.reducer;
