import { checkResponse } from './check-response';
import { BASE_URL } from './config';

export function request<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	return fetch(`${BASE_URL}${endpoint}`, options).then((res) =>
		checkResponse<T>(res)
	);
}

type RefreshResponse = {
	success: boolean;
	refreshToken: string;
	accessToken: string;
};

export const refreshToken = (): Promise<RefreshResponse> => {
	return request<RefreshResponse>('/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then((refreshData) => {
		if (!refreshData.success) {
			return Promise.reject(refreshData);
		}
		localStorage.setItem('refreshToken', refreshData.refreshToken);
		localStorage.setItem('accessToken', refreshData.accessToken);
		return refreshData;
	});
};

export const fetchWithRefresh = async <T = unknown>(
	endpoint: string,
	options: RequestInit
): Promise<T> => {
	try {
		const res = await request<T>(endpoint, options);
		return res;
	} catch (err: unknown) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers = {
				...(options.headers || {}),
				authorization: refreshData.accessToken,
			};
			const res = await request<T>(endpoint, options);
			return res;
		} else {
			return Promise.reject(err);
		}
	}
};
