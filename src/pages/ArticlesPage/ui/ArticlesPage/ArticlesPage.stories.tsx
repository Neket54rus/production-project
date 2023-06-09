import { ComponentMeta, ComponentStory } from '@storybook/react';

import ArticlesPage from './ArticlesPage';

export default {
	title: 'pages/ArticlesPage',
	component: ArticlesPage,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
