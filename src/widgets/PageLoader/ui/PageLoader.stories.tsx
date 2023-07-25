import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
	ThemeDecorator,
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { PageLoader } from './PageLoader';

export default {
	title: 'shared/PageLoader',
	component: PageLoader,
	argTypes: {},
} as ComponentMeta<typeof PageLoader>;

const Template: ComponentStory<typeof PageLoader> = (
	args,
) => <PageLoader {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
