import { StateSchema } from 'app/providers/StoreProvider';

import { counterReducer, counterActions } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice', () => {
	test('decrement', () => {
		const state: CounterSchema = {
			value: 0,
		};
		expect(counterReducer(state, counterActions.decrement())).toEqual({ value: -1 });
	});

	test('increment', () => {
		const state: CounterSchema = {
			value: 0,
		};
		expect(counterReducer(state, counterActions.increment())).toEqual({ value: 1 });
	});

	test('empty state', () => {
		expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
	});
});
