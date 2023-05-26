import { render, screen } from '@testing-library/react';

import { Button, ThemeButton } from 'shared/ui/Button';

describe('Button test', () => {
    test('Test mount btn', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('Test clear theme btn', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
