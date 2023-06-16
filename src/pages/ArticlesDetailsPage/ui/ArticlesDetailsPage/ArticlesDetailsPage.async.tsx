import { lazy } from 'react';

export const ArticlesDetailsPageAsync = lazy(() => new Promise((res) => {
	setTimeout(() => {
		// @ts-expect-error
		res(import('./ArticlesDetailsPage'));
	}, 1000);
}));
