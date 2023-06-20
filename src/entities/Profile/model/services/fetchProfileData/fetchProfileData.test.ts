import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchProfileData } from './fetchProfileData';

describe('fetchProfileData', () => {
	test('success', async () => {
		const data = {
			username: 'admin',
			age: 22,
			country: Country.Russia,
			lastname: 'Lastname',
			first: 'Firstname',
			city: 'Moskow',
			currency: Currency.RUB,
		};

		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockResolvedValue(Promise.resolve({ data }));

		const result = await thunk.callThunk('1');

		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('error', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockResolvedValue(Promise.resolve({ state: 403 }));

		const result = await thunk.callThunk('1');

		expect(result.meta.requestStatus).toBe('rejected');
	});
});
