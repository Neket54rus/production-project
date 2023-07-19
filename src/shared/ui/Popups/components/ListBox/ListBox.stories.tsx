import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
	title: 'shared/ListBox',
	component: ListBox,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Light = Template.bind({});
Light.args = {
	defaultValue: 'Выберете значвение',
	onChange: (value: string) => {},
	value: undefined,
	items: [
		{ value: '1', content: '123' },
		{ value: '2', content: '234', disabled: true },
		{ value: '3', content: '345' },
	],
};
