import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from './Avatar';
import AvatarImg from './avatarImg.jpg';

export default {
	title: 'shared/Avatar',
	component: Avatar,
	argTypes: {},
	args: {
		src: AvatarImg,
	},
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (
	args,
) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	size: 150,
};

export const Small = Template.bind({});
Small.args = {
	size: 50,
};
