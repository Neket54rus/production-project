import { lazy } from 'react';

export const ArticlesPageAsync = lazy(() => new Promise((res) => {
	setTimeout(() => {
		// @ts-expect-error
		res(import('./ArticlesPage'));
	}, 1000);
}));
