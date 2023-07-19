import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { Theme } from '@/app/providers/ThemeProvider';
import { Article } from '@/entities/Article';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const article: Article = {
	id: '1',
	img: '',
	createdAt: '',
	views: 123,
	user: {
		id: '1',
		username: 'username',
	},
	blocks: [],
	type: [],
	title: '123',
	subtitle: '321',
};

export default {
	title: 'features/ArticleRecommendationsList',
	component: ArticleRecommendationsList,
	argTypes: {},
	args: {},
	decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.parameters = {
	mockData: [
		{
			url: `${__API__}/articles?_limit=3`,
			method: 'GET',
			status: 200,
			response: [
				{ ...article, id: '1' },
				{ ...article, id: '2' },
				{ ...article, id: '3' },
			],
		},
	],
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
