import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/types/order';

interface ProfileOrdersState {
	orders: Order[];
	total: number;
	totalToday: number;
	error: string | null;
}

const initialState: ProfileOrdersState = {
	orders: [],
	total: 0,
	totalToday: 0,
	error: null,
};

export const profileOrdersConnect = createAction<string>(
	'profileOrders/connect'
);
export const profileOrdersDisconnect = createAction('profileOrders/disconnect');

const profileOrdersSlice = createSlice({
	name: 'profileOrders',
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
			state.orders = [...action.payload.orders].sort(
				(a, b) => b.number - a.number
			);
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
} = profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;
