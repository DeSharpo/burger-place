import { describe, it, expect } from 'vitest';
import reducer, {
	initialState,
	clearCurrentOrder,
	fetchOrderByNumber,
} from './order-info-slice';

const mockCurrentOrder = { ingredients: {}, _id: '1' };

describe('order-info reducer', () => {
	it('initializes correctly', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('currentOrder should be null', () => {
		const state = reducer(initialState, clearCurrentOrder());
		expect(state).toEqual({
			...initialState,
			currentOrder: null,
			loading: false,
		});
	});

	it('fetchOrderByNumber pending', () => {
		const action = { type: fetchOrderByNumber.pending.type };
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('fetchOrderByNumber fulfilled', () => {
		const action = {
			type: fetchOrderByNumber.fulfilled.type,
			payload: mockCurrentOrder,
		};
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: false,
			currentOrder: mockCurrentOrder,
		});
	});

	it('fetchOrderByNumber rejected', () => {
		const action = {
			type: fetchOrderByNumber.rejected.type,
			error: 'Ошибка загрузки заказа',
		};
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: false,
			error: action.error,
		});
	});
});
