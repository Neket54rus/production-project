import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Currency } from 'entities/Currency/model/types/currecy';

import { CurrencySelect } from './CurrencySelect';

export default {
	title: 'entities/CurrencySelect',
	component: CurrencySelect,
	argTypes: {},
	args: {},
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = () => <CurrencySelect />;

export const Primary = Template.bind({});
Primary.args = {};
