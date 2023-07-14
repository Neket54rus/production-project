import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileData } from './getProfileData';

describe('getLoginError', () => {
	test('should return error', () => {
		const data = {
			username: 'admin',
			age: 22,
			country: Country.Russia,
			lastname: 'Lastname',
			first: 'Firstname',
			city: 'Moskow',
			currency: Currency.RUB,

		};
		const state: DeepPartial<StateSchema> = {
			profile: {
				data,
			},
		};

		expect(getProfileData(state as StateSchema)).toEqual(data);
	});

	test('should return with empty state', () => {
		const state: DeepPartial<StateSchema> = {};

		expect(getProfileData(state as StateSchema)).toEqual(undefined);
	});
});
