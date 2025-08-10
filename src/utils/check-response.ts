export function checkResponse<T = unknown>(res: Response): Promise<T> {
	if (res.ok) {
		return res.json();
	}
	return res.json().then((err) => Promise.reject(err));
}
