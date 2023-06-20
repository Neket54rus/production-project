import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../types/profile';

const data = {
	username: 'admin',
	age: 22,
	country: Country.Russia,
	lastname: 'Lastname',
	first: 'Firstname',
	city: 'Moskow',
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
				form: { ...data, lastname: '' },
			},
		});

		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
		]);
	});
});
