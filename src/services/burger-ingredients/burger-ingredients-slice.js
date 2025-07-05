import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/config';

export const fetchIngredients = createAsyncThunk(
	'burgerIngredients/fetchIngredients',
	async (_, thunkAPI) => {
		try {
			const response = await fetch(API_URL);
			const data = await response.json();
			return data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

const initialState = {
	ingredients: [],
	status: 'idle',
	error: null,
};

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
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

export default burgerIngredientsSlice.reducer;
