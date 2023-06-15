import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../../types/profile';

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
