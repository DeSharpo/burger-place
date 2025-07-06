import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CREATE_ORDER_URLD } from '../../utils/config';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds) => {
		const response = await fetch(CREATE_ORDER_URLD, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients: ingredientIds }),
		});

		if (!response.ok) {
			throw new Error('Ошибка при создании заказа');
		}

		const data = await response.json();
		return data.order.number;
	}
);

const orderDetailsSlice = createSlice({
	name: 'order',
	initialState: {
		orderNumber: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		clearOrder: (state) => {
			state.orderNumber = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orderNumber = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { clearOrder } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
