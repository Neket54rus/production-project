import { addDecorator } from '@storybook/react';

import {
	RouterDecorator,
} from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import {
	StyleDecorator,
} from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import {
	SuspenseDecorator,
} from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import {
	ThemeDecorator,
} from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	layout: 'fullscreen',
	themes: {
		default: 'light',
		list: [
			{ name: 'light', class: Theme.LIGHT, color: '#000000' },
			{ name: 'dark', class: Theme.DARK, color: '#ffffff' },
			{ name: 'orange', class: Theme.ORANGE, color: '#ffb005' },
		],
	},
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(SuspenseDecorator);
addDecorator(RouterDecorator);
