import { lazy } from 'react';

export const MainPageAsync = lazy(() => new Promise((res) => {
	setTimeout(() => {
		// @ts-expect-error
		res(import('./MainPage'));
	}, 1000);
}));
