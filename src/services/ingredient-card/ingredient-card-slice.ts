import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/ingredient';

interface IngredientCardState {
	ingredient: Ingredient | null;
}

export const initialState: IngredientCardState = {
	ingredient: null,
};

const ingredientCardSlice = createSlice({
	name: 'ingredientCard',
	initialState,
	reducers: {
		setCurrentIngredient: (state, action: PayloadAction<Ingredient>) => {
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
