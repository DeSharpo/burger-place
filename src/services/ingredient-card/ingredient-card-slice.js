import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredient: null,
};

const ingredientCardSlice = createSlice({
	name: 'ingredientCard',
	initialState,
	reducers: {
		setCurrentIngredient: (state, action) => {
			state.ingredient = action.payload;
		},
		clearCurrentIngredient: (state) => {
			state.ingredient = null;
		},
	},
});

export const { setCurrentIngredient, clearCurrentIngredient } =
	ingredientCardSlice.actions;
export default ingredientCardSlice.reducer;
