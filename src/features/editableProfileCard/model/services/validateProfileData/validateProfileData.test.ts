import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { ValidateProfileError } from '../../consts/consts';
import { validateProfileData } from './validateProfileData';

const data = {
	username: 'admin',
	age: 22,
	country: Country.Russia,
	lastName: 'LastName',
	first: 'FirstName',
	city: 'Moscow',
	currency: Currency.RUB,
};

describe('validateProfileData', () => {
	test('success', async () => {
		const result = validateProfileData(data);

		expect(result).toEqual([]);
	});

	test('without first and last name', async () => {
		const result = validateProfileData({ ...data, first: '', lastName: '' });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
		]);
	});

	test('incorrect age', async () => {
		const result = validateProfileData({ ...data, age: undefined });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_AGE,
		]);
	});

	test('incorrect country', async () => {
		const result = validateProfileData({ ...data, country: undefined });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_COUNTRY,
		]);
	});

	test('incorrect all', async () => {
		const result = validateProfileData({});

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
			ValidateProfileError.INCORRECT_AGE,
			ValidateProfileError.INCORRECT_COUNTRY,
		]);
	});
});
