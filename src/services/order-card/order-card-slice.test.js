import { describe, it, expect } from 'vitest';
import reducer, {
	initialState,
	setCurrentOrder,
	clearCurrentOrder,
} from './order-card-slice';

const mockOrder = {
	ingredients: ['1', '2'],
	_id: 'order-1',
	status: 'done',
	number: 1234,
};

describe('order-card reducer', () => {
	it('initializes correctly', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('setCurrentOrder should set order', () => {
		const state = reducer(initialState, setCurrentOrder(mockOrder));
		expect(state).toEqual({
			...initialState,
			order: mockOrder,
		});
	});

	it('clearCurrentOrder should reset order', () => {
		const stateWithOrder = {
			order: mockOrder,
		};
		const state = reducer(stateWithOrder, clearCurrentOrder());
		expect(state).toEqual(initialState);
	});
});
