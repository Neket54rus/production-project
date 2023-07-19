import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
	id: '1',
	first: 'John',
	lastName: 'Doe',
	age: 36,
	currency: Currency.EUR,
	country: Country.Kazakhstan,
	city: 'Kazakhstan',
	username: 'John_Doe',
};

const options = {
	initialState: {
		profile: {
			readonly: true,
			data: profile,
			form: profile,
		},
		user: {
			authData: {
				id: '1',
				username: 'John',
			},
		},
	},
	asyncReducers: {
		profile: profileReducer,
	},
};

describe('EditableProfileCard', () => {
	test('Toggle readonly', async () => {
		componentRender(<EditableProfileCard id="1" />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
	});

	test('Cancel button event reaction', async () => {
		componentRender(<EditableProfileCard id="1" />, options);

		await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
		await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

		await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');
		await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'user');

		expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('user');
		expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('user');

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

		expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue(profile.first);
		expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue(profile.lastName);
	});

	test('Validation', async () => {
		componentRender(<EditableProfileCard id="1" />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

		expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
	});

	test('Отправка на сервер', async () => {
		const mockPutRequest = jest.spyOn($api, 'put');

		componentRender(<EditableProfileCard id="1" />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

		expect(mockPutRequest).toHaveBeenCalled();
	});
});
