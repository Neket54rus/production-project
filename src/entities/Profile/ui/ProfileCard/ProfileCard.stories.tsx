import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import Avatar from '@/shared/assets/test/avatarImg.jpg';
import { ProfileCard } from './ProfileCard';

export default {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	argTypes: {},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (
	args,
) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	data: {
		username: 'admin',
		age: 22,
		country: Country.Russia,
		lastName: 'LastName',
		first: 'FirstName',
		city: 'Moscow',
		currency: Currency.RUB,
		avatar: Avatar,
	},
};

export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
	error: 'Error',
};
