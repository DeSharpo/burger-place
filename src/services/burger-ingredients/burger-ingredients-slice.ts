import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { Ingredient } from '../../types/ingredient';

interface IngredientsResponse {
	data: Ingredient[];
}

export const fetchIngredients = createAsyncThunk<
	Ingredient[],
	void,
	{ rejectValue: string }
>('burgerIngredients/fetchIngredients', async (_, thunkAPI) => {
	try {
		const result = await request<IngredientsResponse>('/ingredients');
		return result.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return thunkAPI.rejectWithValue(error.message);
		}
		return thunkAPI.rejectWithValue('Неизвестная ошибка');
	}
});

interface BurgerIngredientsState {
	ingredients: Ingredient[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	counters: Record<string, number>;
}

export const initialState: BurgerIngredientsState = {
	ingredients: [],
	status: 'idle',
	error: null,
	counters: {},
};

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		setCounters: (state, action: PayloadAction<Record<string, number>>) => {
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
				state.error = action.payload ?? 'Unknown error';
			});
	},
});

export const { setCounters } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
