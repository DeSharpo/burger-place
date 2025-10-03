import { describe, it, expect, vi } from 'vitest';
import reducer, {
	initialState,
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructor,
} from './burger-constructor-slice';

const bunIngredient = {
	_id: '1',
	name: 'Булка',
	type: 'bun',
	uuid: 'test-uuid',
};

const sauceIngredient = {
	_id: '2',
	name: 'Соус',
	type: 'sauce',
	uuid: 'test-uuid',
};

vi.mock('uuid', () => ({
	v4: () => 'test-uuid',
}));

describe('burger-constructor reducer', () => {
	it('initializes correctly', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('addIngredient should add bun', () => {
		const state = reducer(initialState, addIngredient(bunIngredient));
		expect(state).toEqual({
			...initialState,
			bun: bunIngredient,
		});
	});

	it('addIngredient should add ingredient', () => {
		const state = reducer(initialState, addIngredient(sauceIngredient));
		expect(state).toEqual({
			...initialState,
			ingredients: [sauceIngredient],
		});
	});

	it('removeIngredient should remove ingredient by uuid', () => {
		const stateWithIngredients = {
			...initialState,
			ingredients: [sauceIngredient],
		};
		const state = reducer(
			stateWithIngredients,
			removeIngredient(sauceIngredient.uuid)
		);
		expect(state).toEqual({
			...initialState,
			ingredients: [],
		});
	});

	it('moveIngredient should change ingredient order', () => {
		const ing1 = { ...sauceIngredient, uuid: 'uuid-1' };
		const ing2 = { ...sauceIngredient, uuid: 'uuid-2' };
		const stateWithIngredients = {
			...initialState,
			ingredients: [ing1, ing2],
		};
		const state = reducer(
			stateWithIngredients,
			moveIngredient({ fromIndex: 0, toIndex: 1 })
		);
		expect(state.ingredients.map((i) => i.uuid)).toEqual(['uuid-2', 'uuid-1']);
	});

	it('clearConstructor should clear bun and ingredients', () => {
		const stateWithData = {
			...initialState,
			bun: bunIngredient,
			ingredients: [sauceIngredient],
		};
		const state = reducer(stateWithData, clearConstructor());
		expect(state).toEqual(initialState);
	});
});
