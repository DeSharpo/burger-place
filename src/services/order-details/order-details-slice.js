import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orderNumber: null,
	orderRequest: false,
	orderFailed: false,
};

const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {
		createOrderRequest: (state) => {
			state.orderRequest = true;
		},
		createOrderSuccess: (state, action) => {
			state.orderRequest = false;
			state.orderFailed = false;
			state.orderNumber = action.payload;
		},
		createOrderFailure: (state) => {
			state.orderRequest = false;
			state.orderFailed = true;
		},
	},
});

export const { createOrderRequest, createOrderSuccess, createOrderFailure } =
	orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
