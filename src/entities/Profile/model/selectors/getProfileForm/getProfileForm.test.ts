import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileForm } from './getProfileForm';

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
				form: data,
			},
		};

		expect(getProfileForm(state as StateSchema)).toEqual(data);
	});

	test('should return with empty state', () => {
		const state: DeepPartial<StateSchema> = {};

		expect(getProfileForm(state as StateSchema)).toEqual(undefined);
	});
});
