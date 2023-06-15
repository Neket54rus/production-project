import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Select } from './Select';

export default {
	title: 'shared/Select',
	component: Select,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (
	args,
) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	label: 'test label',
	options: [
		{ value: '1', content: 'Первый пункт' },
		{ value: '2', content: 'Второй пункт' },
		{ value: '3', content: 'Третий пункт' },
	],
};
