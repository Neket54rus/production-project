import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
	ThemeDecorator,
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
	title: 'shared/Modal',
	component: Modal,
	argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (
	args,
) => <Modal {...args} />;

export const Light = Template.bind({});
Light.args = {
	children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aspernatur.',
	isOpen: true,
};

export const Dark = Template.bind({});
Dark.args = {
	children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aspernatur.',
	isOpen: true,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
