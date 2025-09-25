import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchWithRefresh, request } from '../../utils/request';

const accessToken = () => localStorage.getItem('accessToken');

export interface User {
	email: string;
	name: string;
}

interface UserState {
	user: User | null;
	isAuthChecked: boolean;
}

const initialState: UserState = {
	user: null,
	isAuthChecked: false,
};

interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: User;
}

export const registerUser = createAsyncThunk<
	User,
	{ email: string; password: string; name: string }
>('user/register', async ({ email, password, name }) => {
	const res = await request<AuthResponse>('/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, name }),
	});

	localStorage.setItem('accessToken', res.accessToken);
	localStorage.setItem('refreshToken', res.refreshToken);
	return res.user;
});

export const loginUser = createAsyncThunk<
	User,
	{ email: string; password: string }
>('user/login', async ({ email, password }) => {
	const res = await request<AuthResponse>('/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});

	localStorage.setItem('accessToken', res.accessToken);
	localStorage.setItem('refreshToken', res.refreshToken);
	return res.user;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
	const res = await request('/auth/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});

	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	return res;
});

export const getUser = createAsyncThunk<User>('user/get', async () => {
	return await fetchWithRefresh<AuthResponse>('/auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: accessToken() ?? '',
		},
	}).then((res) => res.user);
});

export const updateUser = createAsyncThunk<User, Partial<User>>(
	'user/update',
	async (payload) => {
		return await fetchWithRefresh<AuthResponse>('/auth/user', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: accessToken() ?? '',
			},
			body: JSON.stringify(payload),
		}).then((res) => res.user);
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(getUser.rejected, (state) => {
				state.user = null;
				state.isAuthChecked = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isAuthChecked = true;
			});
	},
});

export const { setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
