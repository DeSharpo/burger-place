import { checkResponse } from './check-response';
import { BASE_URL } from './config';

export function request(endpoint, options = {}) {
	return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

export const refreshToken = () => {
	return request('/auth/token', {
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

export const fetchWithRefresh = async (endpoint, options) => {
	try {
		const res = await request(endpoint, options);
		return res;
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers = {
				...(options.headers || {}),
				authorization: refreshData.accessToken,
			};
			const res = await request(endpoint, options);
			return res;
		} else {
			return Promise.reject(err);
		}
	}
};
