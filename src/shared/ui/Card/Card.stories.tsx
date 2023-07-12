import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text } from '../Text/Text';

import { Card } from './Card';

export default {
	title: 'shared/Card',
	component: Card,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: <Text title="test" text="test" />,
};
