import { render, screen } from '@testing-library/react';

import { Button, ButtonTheme } from './Button';

describe('Button test', () => {
	test('Test mount btn', () => {
		render(<Button>TEST</Button>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});

	test('Test clear theme btn', () => {
		render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
		expect(screen.getByText('TEST')).toHaveClass('clear');
	});
});
