import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import AddCommentForm from './AddCommentForm';

export default {
	title: 'features/AddCommentForm',
	component: AddCommentForm,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Default = Template.bind({});
Default.args = {
	onSendComment: action('onSendComment'),
};
Default.decorators = [
	StoreDecorator({}),
];
