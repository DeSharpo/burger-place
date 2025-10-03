import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../utils/request';

interface OrderResponse {
	order: { number: number };
}

export const createOrder = createAsyncThunk<
	number,
	string[],
	{ rejectValue: string }
>('order/createOrder', async (ingredientIds, thunkAPI) => {
	try {
		const response = await request<OrderResponse>('/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('accessToken') ?? '',
			},
			body: JSON.stringify({ ingredients: ingredientIds }),
		});

		return response.order.number;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return thunkAPI.rejectWithValue(error.message);
		}
		return thunkAPI.rejectWithValue('Неизвестная ошибка');
	}
});

interface OrderDetailsState {
	orderNumber: number | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export const initialState: OrderDetailsState = {
	orderNumber: null,
	status: 'idle',
	error: null,
};

const orderDetailsSlice = createSlice({
	name: 'order',
	initialState,
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
			.addCase(
				createOrder.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.status = 'succeeded';
					state.orderNumber = action.payload;
				}
			)
			.addCase(createOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Unknown error';
			});
	},
});

export const { clearOrder } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
