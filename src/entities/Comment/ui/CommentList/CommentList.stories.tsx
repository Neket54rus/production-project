import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CommentList } from './CommentList';

export default {
	title: 'entities/CommentList',
	component: CommentList,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Default = Template.bind({});
Default.args = {
	comments: [
		{
			id: '1',
			text: 'hello, world',
			user: {
				id: '1',
				username: 'Nikita',
			},
		},
		{
			id: '2',
			text: 'hello, world',
			user: {
				id: '2',
				username: 'Petya',
			},
		},
	],
};

export const Loading = Template.bind({});
Loading.args = {
	comments: [],
	isLoading: true,
};
