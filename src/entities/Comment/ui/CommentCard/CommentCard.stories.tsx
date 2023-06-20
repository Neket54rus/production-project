import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CommentCard } from './CommentCard';

export default {
	title: 'entities/CommentCard',
	component: CommentCard,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Default = Template.bind({});
Default.args = {
	comment: {
		id: '1',
		text: 'Hello world',
		user: {
			id: '1',
			username: 'Nikita',
		},
	},
};

export const Loading = Template.bind({});
Loading.args = {
	comment: {
		id: '1',
		text: 'Hello world',
		user: {
			id: '1',
			username: 'Nikita',
		},
	},
	isLoading: true,
};
