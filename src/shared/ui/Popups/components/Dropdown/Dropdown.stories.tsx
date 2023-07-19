import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '../../../Button';
import { Dropdown } from './Dropdown';

export default {
	title: 'shared/Dropdown',
	component: Dropdown,
	argTypes: {},
	args: {
		items: [
			{ content: <p>123</p> },
			{ disabled: true, content: <p>2341231231231</p> },
			{ content: <p>345</p> },
		],
	},
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
	trigger: <Button>Open!</Button>,
};
