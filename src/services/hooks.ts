import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export type RootState = unknown;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = any;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	useSelector as any;
