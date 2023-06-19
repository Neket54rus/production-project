import { StateSchema } from 'app/providers/StoreProvider';

import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from './articleDetails';

describe('getArticleDetailsData', () => {
	test('should return data', () => {
		const data = {
			id: '1',
			title: 'title',
		};

		const state: DeepPartial<StateSchema> = {
			articleDetails: { data },
		};

		expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
	});

	test('getArticleDetailsData with undefined state', () => {
		const state: DeepPartial<StateSchema> = {};

		expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
	});

	test('should return loading', () => {
		const state: DeepPartial<StateSchema> = {
			articleDetails: { isLoading: true },
		};

		expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
	});

	test('should return error', () => {
		const state: DeepPartial<StateSchema> = {
			articleDetails: { error: 'error message' },
		};

		expect(getArticleDetailsError(state as StateSchema)).toEqual('error message');
	});
});
