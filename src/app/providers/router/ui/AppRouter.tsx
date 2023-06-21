import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/ui/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const { path, authOnly, element } = route;

		return (
			<Route
				key={path}
				path={path}
				element={
					authOnly
						? <RequireAuth>{element as JSX.Element}</RequireAuth>
						: element
				}
			/>
		);
	}, []);

	return (
		<Suspense fallback={(<PageLoader />)}>
			<Routes>
				{Object.values(routeConfig).map(renderWithWrapper)}
			</Routes>
		</Suspense>
	);
};

export default memo(AppRouter);
