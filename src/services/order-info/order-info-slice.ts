import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '@/utils/request';
import { Order } from '@/types/order';

interface OrderInfoState {
	currentOrder: Order | null;
	loading: boolean;
	error: string | null;
}

export const initialState: OrderInfoState = {
	currentOrder: null,
	loading: false,
	error: null,
};

export const fetchOrderByNumber = createAsyncThunk<
	Order,
	string,
	{ rejectValue: string }
>('orderInfo/fetchOrderByNumber', async (number, thunkAPI) => {
	try {
		const res = await request<{ success: boolean; orders: Order[] }>(
			`/orders/${number}`
		);
		if (!res.success || !res.orders.length) {
			return thunkAPI.rejectWithValue('Заказ не найден');
		}
		return res.orders[0];
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		return thunkAPI.rejectWithValue(err.message);
	}
});

const orderInfoSlice = createSlice({
	name: 'orderInfo',
	initialState,
	reducers: {
		clearCurrentOrder: (state) => {
			state.currentOrder = null;
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrderByNumber.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchOrderByNumber.fulfilled,
				(state, action: PayloadAction<Order>) => {
					state.loading = false;
					state.currentOrder = action.payload;
				}
			)
			.addCase(fetchOrderByNumber.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Ошибка загрузки заказа';
			});
	},
});

export const { clearCurrentOrder } = orderInfoSlice.actions;
export default orderInfoSlice.reducer;
