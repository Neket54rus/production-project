import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileReducer, profileActions } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const data = {
	username: 'admin',
	age: 22,
	country: Country.Russia,
	lastname: 'Lastname',
	first: 'Firstname',
	city: 'Moskow',
	currency: Currency.RUB,
};

describe('profileSlice', () => {
	test('test set readonly', () => {
		const state: DeepPartial<ProfileSchema> = { readonly: false };
		expect(profileReducer(
			state as ProfileSchema,
			profileActions.setReadonly(true),
		)).toEqual({ readonly: true });
	});

	test('test cancel edit', () => {
		const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };

		expect(profileReducer(
			state as ProfileSchema,
			profileActions.cancelEdit(),
		)).toEqual({
			readonly: true,
			validateError: undefined,
			data,
			form: data,
		});
	});

	test('test update profile', () => {
		const state: DeepPartial<ProfileSchema> = { form: { username: 'old' } };

		expect(profileReducer(
			state as ProfileSchema,
			profileActions.updateProfile({
				username: 'new',
			}),
		)).toEqual({
			form: { username: 'new' },
		});
	});

	test('test update profile service pending', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: false,
			validateError: [ValidateProfileError.SERVER_ERROR],
		};

		expect(profileReducer(
			state as ProfileSchema,
			updateProfileData.pending,
		)).toEqual({
			isLoading: true,
			validateError: undefined,
		});
	});

	test('test update profile service fullfilled', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: true,
		};

		expect(profileReducer(
			state as ProfileSchema,
			updateProfileData.fulfilled(data, ''),
		)).toEqual({
			isLoading: false,
			validateError: undefined,
			readonly: true,
			form: data,
			data,
		});
	});
});
