import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
	title: 'shared/Tabs',
	component: Tabs,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
	tabs: [
		{ value: 'tab 1', content: 'tab 1' },
		{ value: 'tab 2', content: 'tab 2' },
		{ value: 'tab 3', content: 'tab 3' },
	],
	value: 'tab 2',
	onTabClick: action('onTabClick'),
};
