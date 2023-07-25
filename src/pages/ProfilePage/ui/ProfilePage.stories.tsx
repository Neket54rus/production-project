import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import {
	ThemeDecorator,
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
// import Avatar from 'shared/assets/test/avatarImg.jpg';
import ProfilePage from './ProfilePage';

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	argTypes: {},
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
	profile: {
		form: {
			username: 'admin',
			age: 22,
			country: Country.Russia,
			lastName: 'LastName',
			first: 'FirstName',
			city: 'Moscow',
			currency: Currency.RUB,
		},
	},
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
	profile: {
		form: {
			username: 'admin',
			age: 22,
			country: Country.Russia,
			lastName: 'LastName',
			first: 'FirstName',
			city: 'Moscow',
			currency: Currency.RUB,
		},
	},
})];
