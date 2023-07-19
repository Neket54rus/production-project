import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getLoginError', () => {
	test('should return error', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				error: 'Error message',
			},
		};

		expect(getProfileError(state as StateSchema)).toEqual('Error message');
	});

	test('should return with empty state', () => {
		const state: DeepPartial<StateSchema> = {};

		expect(getProfileError(state as StateSchema)).toEqual(undefined);
	});
});
