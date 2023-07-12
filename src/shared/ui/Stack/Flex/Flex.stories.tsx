import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Flex } from './Flex';

export default {
	title: 'shared/Flex',
	component: Flex,
	argTypes: {},
	args: {
		children: (
			<>
				<div>First</div>
				<div>Second</div>
				<div>Third</div>
			</>
		),
	},
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Row = Template.bind({});
Row.args = {
	direction: 'row',
};

export const Column = Template.bind({});
Column.args = {
	direction: 'column',
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
	align: 'center',
};

export const AlignStart = Template.bind({});
AlignStart.args = {
	align: 'start',
};

export const AlignEnd = Template.bind({});
AlignEnd.args = {
	align: 'end',
};

export const JustifyCenter = Template.bind({});
JustifyCenter.args = {
	justify: 'center',
};

export const JustifyStart = Template.bind({});
JustifyStart.args = {
	justify: 'start',
};

export const JustifyEnd = Template.bind({});
JustifyEnd.args = {
	justify: 'end',
};

export const JustifyBetween = Template.bind({});
JustifyBetween.args = {
	justify: 'between',
};

export const JustifyAround = Template.bind({});
JustifyAround.args = {
	justify: 'around',
};

export const JustifyEvently = Template.bind({});
JustifyEvently.args = {
	justify: 'evenly',
};

export const Gap4 = Template.bind({});
Gap4.args = {
	gap: '4',
};

export const Gap8 = Template.bind({});
Gap8.args = {
	gap: '8',
};

export const Gap16 = Template.bind({});
Gap16.args = {
	gap: '16',
};

export const Gap32 = Template.bind({});
Gap32.args = {
	gap: '32',
};
