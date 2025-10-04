import { describe, it, expect } from 'vitest';
import reducer, {
	initialState,
	setAuthChecked,
	registerUser,
	loginUser,
	getUser,
	logoutUser,
} from './user-slice';

const mockUser = {
	email: 'test@mail.com',
	name: 'Test User',
};

describe('user reducer', () => {
	it('initializes correctly', () => {
		const state = reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('setAuthChecked should set isAuthChecked to true', () => {
		const state = reducer(initialState, setAuthChecked(true));
		expect(state).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	it('setAuthChecked should set isAuthChecked to false', () => {
		const state = reducer(
			{ ...initialState, isAuthChecked: true },
			setAuthChecked(false)
		);
		expect(state).toEqual({
			...initialState,
			isAuthChecked: false,
		});
	});

	it('registerUser fulfilled', () => {
		const action = { type: registerUser.fulfilled.type, payload: mockUser };
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuthChecked: true,
		});
	});

	it('loginUser fulfilled', () => {
		const action = { type: loginUser.fulfilled.type, payload: mockUser };
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuthChecked: true,
		});
	});

	it('getUser fulfilled', () => {
		const action = { type: getUser.fulfilled.type, payload: mockUser };
		const state = reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuthChecked: true,
		});
	});

	it('getUser rejected', () => {
		const action = { type: getUser.rejected.type };
		const state = reducer({ user: mockUser, isAuthChecked: false }, action);
		expect(state).toEqual({
			...initialState,
			user: null,
			isAuthChecked: true,
		});
	});

	it('logoutUser fulfilled', () => {
		const action = { type: logoutUser.fulfilled.type };
		const state = reducer({ user: mockUser, isAuthChecked: false }, action);
		expect(state).toEqual({
			...initialState,
			user: null,
			isAuthChecked: true,
		});
	});
});
