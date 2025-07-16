import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';

export const fetchIngredients = createAsyncThunk(
	'burgerIngredients/fetchIngredients',
	async (_, thunkAPI) => {
		try {
			const result = await request('/ingredients');
			return result.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

const initialState = {
	ingredients: [],
	status: 'idle',
	error: null,
	counters: {},
};

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		setCounters: (state, action) => {
			state.counters = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.ingredients = action.payload;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { setCounters } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
