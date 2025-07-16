import { checkResponse } from './check-response';
import { BASE_URL } from './config';

export function request(endpoint, options = {}) {
	return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}
