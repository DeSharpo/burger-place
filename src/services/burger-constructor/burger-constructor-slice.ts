import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from '../../types/ingredient';

export interface ConstructorIngredient extends Ingredient {
	uuid: string;
}

interface BurgerConstructorState {
	bun: ConstructorIngredient | null;
	ingredients: ConstructorIngredient[];
}

export const initialState: BurgerConstructorState = {
	bun: null,
	ingredients: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: {
			reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
				const item = { ...action.payload };
				if (item.type === 'bun') {
					state.bun = item;
				} else {
					state.ingredients.push(item);
				}
			},
			prepare: (ingredient: Ingredient) => {
				return { payload: { ...ingredient, uuid: uuidv4() } };
			},
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				(item) => item.uuid !== action.payload
			);
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) => {
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
