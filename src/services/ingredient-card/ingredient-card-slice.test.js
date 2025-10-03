import { describe, it, expect } from 'vitest';
import reducer, {
	initialState,
	setCurrentIngredient,
	clearCurrentIngredient,
} from './ingredient-card-slice';

const mockIngredient = {
	_id: '1',
	name: 'Булка',
	type: 'bun',
};

describe('ingredient-card reducer', () => {
	it('initializes correctly', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('setCurrentIngredient should set ingredient', () => {
		const state = reducer(initialState, setCurrentIngredient(mockIngredient));
		expect(state).toEqual({
			...initialState,
			ingredient: mockIngredient,
		});
	});

	it('clearCurrentIngredient should reset ingredient', () => {
		const stateWithIngredient = {
			ingredient: mockIngredient,
		};
		const state = reducer(stateWithIngredient, clearCurrentIngredient());
		expect(state).toEqual(initialState);
	});
});
