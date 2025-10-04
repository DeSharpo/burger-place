import { describe, it, expect } from 'vitest';
import reducer, {
	initialState,
	setCounters,
	fetchIngredients,
} from './burger-ingredients-slice';

const mockIngredients = [
	{ _id: '1', name: 'Булка' },
	{ _id: '2', name: 'Соус' },
];

describe('burger-ingredients reducer', () => {
	it('initializes correctly', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('setCounters should update counters', () => {
		const counters = { 1: 2, 2: 3 };
		const state = reducer(initialState, setCounters(counters));
		expect(state).toEqual({
			...initialState,
			counters,
		});
	});

	it('fetchIngredients pending', () => {
		const action = { type: fetchIngredients.pending.type };
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: 'loading',
		});
	});

	it('fetchIngredients fulfilled', () => {
		const action = {
			type: fetchIngredients.fulfilled.type,
			payload: mockIngredients,
		};
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			ingredients: mockIngredients,
			status: 'succeeded',
		});
	});

	it('fetchIngredients rejected', () => {
		const action = {
			type: fetchIngredients.rejected.type,
			error: 'Unknown error',
		};
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: 'failed',
			error: action.error,
		});
	});
});
