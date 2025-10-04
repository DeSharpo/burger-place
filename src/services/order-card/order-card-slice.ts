import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/order';

interface OrderCardState {
	order: Order | null;
}

export const initialState: OrderCardState = {
	order: null,
};

const orderCardSlice = createSlice({
	name: 'orderCard',
	initialState,
	reducers: {
		setCurrentOrder: (state, action: PayloadAction<Order>) => {
			state.order = action.payload;
		},
		clearCurrentOrder: (state) => {
			state.order = null;
		},
	},
});

export const { setCurrentOrder, clearCurrentOrder } = orderCardSlice.actions;
export default orderCardSlice.reducer;
