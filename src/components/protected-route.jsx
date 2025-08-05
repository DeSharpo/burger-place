import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
	const { user, isAuthChecked } = useSelector((state) => state.user);
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
export const OnlyUnAuth = ({ component }) => (
	<ProtectedRoute onlyUnAuth={true} component={component} />
);
