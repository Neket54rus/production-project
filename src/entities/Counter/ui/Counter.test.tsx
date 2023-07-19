import { fireEvent, screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { Counter } from './Counter';

describe('Counter', () => {
	test('Render', () => {
		componentRender(<Counter />, {
			initialState: { counter: { value: 10 } },
		});
		expect(screen.getByTestId('value-title')).toHaveTextContent('10');
	});

	test('Increment', () => {
		componentRender(<Counter />, {
			initialState: { counter: { value: 10 } },
		});
		fireEvent.click(screen.getByTestId('increment-btn'));
		expect(screen.getByTestId('value-title')).toHaveTextContent('11');
	});

	test('Decrement', () => {
		componentRender(<Counter />, {
			initialState: { counter: { value: 10 } },
		});
		fireEvent.click(screen.getByTestId('decrement-btn'));
		expect(screen.getByTestId('value-title')).toHaveTextContent('9');
	});
});
