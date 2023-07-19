import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import {
	ThemeDecorator,
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Spinner } from './Spinner';

export default {
	title: 'shared/Spinner',
	component: Spinner,
	argTypes: {},
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = () => <Spinner />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
