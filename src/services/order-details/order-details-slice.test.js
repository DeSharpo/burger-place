import { describe, it, expect } from 'vitest';
import reducer, {
	clearOrder,
	initialState,
	createOrder,
} from './order-details-slice';

const mockOrderNumber = 1234;

describe('order-details reducer', () => {
	it('initializes correctly', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('orderNumber should be null', () => {
		const state = reducer(initialState, clearOrder());
		expect(state).toEqual({
			...initialState,
			orderNumber: null,
		});
	});

	it('createOrder pending', () => {
		const action = { type: createOrder.pending.type };
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: 'loading',
		});
	});

	it('createOrder fulfilled', () => {
		const action = {
			type: createOrder.fulfilled.type,
			payload: mockOrderNumber,
		};
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: 'succeeded',
			orderNumber: mockOrderNumber,
		});
	});

	it('createOrder rejected', () => {
		const action = { type: createOrder.rejected.type, error: 'Unknown error' };
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			status: 'failed',
			error: action.error,
		});
	});
});
