import { ComponentMeta, ComponentStory } from '@storybook/react';

import ArticlesDetailsPage from './ArticlesDetailsPage';

export default {
	title: '/ArticlesDetailsPage',
	component: ArticlesDetailsPage,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof ArticlesDetailsPage>;

const Template: ComponentStory<typeof ArticlesDetailsPage> = (args) => <ArticlesDetailsPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
