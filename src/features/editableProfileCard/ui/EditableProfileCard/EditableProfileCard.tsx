import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import {
	ValidateProfileError,
	fetchProfileData,
	getProfileError,
	getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors, profileActions, profileReducer,
} from '../..';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
	className?: string
	id?: string
}

const reducers: ReducersList = {
	profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
	const {
		className,
		id,
	} = props;

	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateErrors);

	const validateErrorsTranslates = {
		[ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
		[ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
		[ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
		[ValidateProfileError.NO_DATA]: t('Данные не указаны'),
		[ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
	};

	const onChangeFirstName = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ first: value || '' }));
	}, [dispatch]);

	const onChangeLastName = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ lastName: value || '' }));
	}, [dispatch]);

	const onChangeAge = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ age: Number(value?.match(/^\d+$/) || 0) }));
	}, [dispatch]);

	const onChangeCity = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ city: value || '' }));
	}, [dispatch]);

	const onChangeUsername = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ username: value || '' }));
	}, [dispatch]);

	const onChangeAvatar = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ avatar: value || '' }));
	}, [dispatch]);

	const onChangeCurrency = useCallback((currency: Currency) => {
		dispatch(profileActions.updateProfile({ currency }));
	}, [dispatch]);

	const onChangeCountry = useCallback((country: Country) => {
		dispatch(profileActions.updateProfile({ country }));
	}, [dispatch]);

	useInitialEffect(() => {
		if (id) {
			dispatch(fetchProfileData(id));
		}
	});

	if (!id) {
		return (
			<div className={classNames('', {}, [className])}>
				{t('ID не найден')}
			</div>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames('', {}, [className])}>
				<EditableProfileCardHeader />
				{validateErrors?.length && validateErrors.map((err) => (
					<Text
						key={err}
						theme={TextTheme.ERROR}
						text={validateErrorsTranslates[err]}
						data-testid="EditableProfileCard.Error"
					/>
				))}
				<ProfileCard
					data={formData}
					isLoading={isLoading}
					error={error}
					onChangeLastName={onChangeLastName}
					onChangeFirstName={onChangeFirstName}
					onChangeAge={onChangeAge}
					onChangeCity={onChangeCity}
					onChangeAvatar={onChangeAvatar}
					onChangeUsername={onChangeUsername}
					onChangeCurrency={onChangeCurrency}
					onChangeCountry={onChangeCountry}
					readonly={readonly}
				/>
			</div>
		</DynamicModuleLoader>

	);
});
