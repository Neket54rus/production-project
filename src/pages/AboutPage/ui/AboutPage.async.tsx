import { lazy } from 'react';

export const AboutPageAsync = lazy(() => new Promise((res) => {
	setTimeout(() => {
		// @ts-expect-error
		res(import('./AboutPage'));
	}, 1000);
}));
