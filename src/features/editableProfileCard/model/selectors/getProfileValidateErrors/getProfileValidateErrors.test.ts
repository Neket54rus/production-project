import { StateSchema } from 'app/providers/StoreProvider';

import { ValidateProfileError } from '../../consts/consts';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors', () => {
	test('should return errors', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				validateError: [
					ValidateProfileError.SERVER_ERROR,
				],
			},
		};

		expect(getProfileValidateErrors(state as StateSchema)).toEqual([
			ValidateProfileError.SERVER_ERROR,
		]);
	});

	test('should return with empty state', () => {
		const state: DeepPartial<StateSchema> = {};

		expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
	});
});
