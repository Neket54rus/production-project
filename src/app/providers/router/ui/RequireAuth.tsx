import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserAuthData, getUserRoles } from '@/entities/User';
import { UserRole } from '@/entities/User/model/types/user';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
	children: JSX.Element
	role?: UserRole[]
}

export const RequireAuth = (props: RequireAuthProps) => {
	const {
		children,
		role,
	} = props;

	const isAuth = useSelector(getUserAuthData);
	const location = useLocation();
	const userRole = useSelector(getUserRoles);

	const hasRequiredRole = useMemo(() => {
		if (!role) {
			return true;
		}

		return role.some((reqRole) => {
			const hasRole = userRole?.includes(reqRole);
			return hasRole;
		});
	}, [role, userRole]);

	if (!isAuth) {
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
	}

	if (!hasRequiredRole) {
		return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
	}

	return children;
};
