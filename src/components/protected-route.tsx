import { ReactElement } from 'react';
import { useAppSelector } from '@/services/hooks';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
	onlyUnAuth?: boolean;
	component: ReactElement;
};

type UserSlice = {
	user: unknown;
	isAuthChecked: boolean;
};

const ProtectedRoute = ({ onlyUnAuth = false, component }: Props) => {
	const { user, isAuthChecked } = useAppSelector(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(s) => (s as any).user
	) as UserSlice;
	const location = useLocation();

	if (!isAuthChecked) {
		return <p>Загрузка...</p>;
	}

	if (!onlyUnAuth && !user) {
		// for authenticated, but unauthenticated
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		// for unauthenticated, but authenticated
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	// !onlyUnAuth && user for authenticated and authenticated
	// onlyUnAuth && !user for unauthenticated and unauthenticated

	return component;
};

export const OnlyAuth = ProtectedRoute;

type OnlyUnAuthProps = {
	component: ReactElement;
};

export const OnlyUnAuth = ({ component }: OnlyUnAuthProps) => (
	<ProtectedRoute onlyUnAuth={true} component={component} />
);
