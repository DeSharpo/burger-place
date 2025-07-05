import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			state.ingredients.push(action.payload);
		},
		removeIngredient: (state, action) => {
			state.ingredients = state.ingredients.filter(
				(item) => item.id !== action.payload
			);
		},
		clearConstructor: (state) => {
			state.ingredients = [];
		},
	},
});

export const { addIngredient, removeIngredient, clearConstructor } =
	burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
