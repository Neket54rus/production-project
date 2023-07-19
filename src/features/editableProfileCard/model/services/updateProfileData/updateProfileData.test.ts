import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { ValidateProfileError } from '../../consts/consts';
import { updateProfileData } from './updateProfileData';

const data = {
	username: 'admin',
	age: 22,
	country: Country.Russia,
	lastName: 'LastName',
	first: 'FirstName',
	city: 'Moscow',
	currency: Currency.RUB,
	id: '1',
};

describe('updateProfileData', () => {
	test('success', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
			},
		});
		thunk.api.put.mockResolvedValue(Promise.resolve({ data }));

		const result = await thunk.callThunk();

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('server error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
			},
		});
		thunk.api.put.mockResolvedValue(Promise.resolve({ state: 403 }));

		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([
			ValidateProfileError.SERVER_ERROR,
		]);
	});

	test('validate error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: { ...data, lastName: '' },
			},
		});

		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
		]);
	});
});
