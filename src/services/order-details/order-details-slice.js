import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds, thunkAPI) => {
		try {
			const response = await request('/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients: ingredientIds }),
			});

			return response.order.number;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
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
