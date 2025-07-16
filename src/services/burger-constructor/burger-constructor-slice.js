import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
	bun: null,
	ingredients: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: {
			reducer: (state, action) => {
				const item = { ...action.payload };
				if (item.type === 'bun') {
					state.bun = item;
				} else {
					state.ingredients.push(item);
				}
			},
			prepare: (ingredient) => {
				return { payload: { ...ingredient, uuid: uuidv4() } };
			},
		},
		removeIngredient: (state, action) => {
			state.ingredients = state.ingredients.filter(
				(item) => item.uuid !== action.payload
			);
		},
		moveIngredient: (state, action) => {
			const { fromIndex, toIndex } = action.payload;
			const updated = [...state.ingredients];
			const [moved] = updated.splice(fromIndex, 1);
			updated.splice(toIndex, 0, moved);
			state.ingredients = updated;
		},
		clearConstructor: (state) => {
			state.bun = null;
			state.ingredients = [];
		},
	},
});

export const {
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructor,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
