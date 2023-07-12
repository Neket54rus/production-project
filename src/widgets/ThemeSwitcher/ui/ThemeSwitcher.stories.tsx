import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import {
	ThemeDecorator,
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
	title: 'shared/ThemeSwitcher',
	component: ThemeSwitcher,
	argTypes: {},
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = () => <ThemeSwitcher />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
