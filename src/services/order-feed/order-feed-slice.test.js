import { describe, it, expect } from 'vitest';
import reducer, {
	initialState,
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetOrders,
} from './order-feed-slice';

const mockOrders = [
	{ _id: '1', number: 111, status: 'done', ingredients: ['1', '2'] },
	{ _id: '2', number: 222, status: 'pending', ingredients: ['3'] },
];

describe('order-feed reducer', () => {
	it('initializes correctly', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('wsConnectionSuccess should reset error', () => {
		const stateWithError = {
			...initialState,
			error: 'Connection failed',
		};
		const state = reducer(stateWithError, wsConnectionSuccess());
		expect(state).toEqual({
			...initialState,
			error: null,
		});
	});

	it('wsConnectionError should set error', () => {
		const state = reducer(initialState, wsConnectionError('Socket error'));
		expect(state).toEqual({
			...initialState,
			error: 'Socket error',
		});
	});

	it('wsConnectionClosed should clear orders and totals', () => {
		const stateWithOrders = {
			...initialState,
			orders: mockOrders,
			total: 100,
			totalToday: 50,
		};
		const state = reducer(stateWithOrders, wsConnectionClosed());
		expect(state).toEqual({
			...initialState,
			orders: [],
			total: 0,
			totalToday: 0,
		});
	});

	it('wsGetOrders should set orders and totals', () => {
		const payload = {
			orders: mockOrders,
			total: 200,
			totalToday: 120,
		};
		const state = reducer(initialState, wsGetOrders(payload));
		expect(state).toEqual({
			...initialState,
			orders: mockOrders,
			total: 200,
			totalToday: 120,
		});
	});
});
