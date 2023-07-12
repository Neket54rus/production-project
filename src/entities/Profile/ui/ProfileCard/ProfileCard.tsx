import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';

import { Profile } from '../../model/types/profile';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
	className?: string
	data?: Profile
	isLoading?: boolean
	error?: string
	readonly?: boolean
	onChangeFirstname?: (value?: string) => void
	onChangeLastname?: (value?: string) => void
	onChangeCity?: (value?: string) => void
	onChangeAge?: (value?: string) => void
	onChangeUsername?: (value?: string) => void
	onChangeAvatar?: (value?: string) => void
	onChangeCurrency?: (currency: Currency) => void
	onChangeCountry?: (country: Country) => void
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		error,
		onChangeFirstname,
		onChangeLastname,
		readonly,
		onChangeAge,
		onChangeCity,
		onChangeAvatar,
		onChangeUsername,
		onChangeCurrency,
		onChangeCountry,
	} = props;

	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
				<PageLoader />
			</div>
		);
	}

	if (error) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text
					theme={TextTheme.ERROR}
					title={t('Произошла ошибка при загрузке профиля')}
					text={t('Попробуйте обновить страницу')}
					align={TextAlign.CENTER}
				/>
			</div>
		);
	}

	return (
		<VStack className={classNames(cls.ProfileCard, { [cls.editing]: !readonly }, [className])} gap="8">
			{data?.avatar && (
				<HStack className={cls.avatarWrapper} justify="center">
					<Avatar src={data.avatar} size={150} alt={t('Аватар')} />
				</HStack>
			)}
			<Input
				className={cls.input}
				value={data?.first}
				placeholder={t('Имя')}
				onChange={onChangeFirstname}
				readonly={readonly}
			/>
			<Input
				className={cls.input}
				value={data?.lastname}
				placeholder={t('Фамилия')}
				onChange={onChangeLastname}
				readonly={readonly}
			/>
			<Input
				className={cls.input}
				value={data?.age}
				placeholder={t('Возраст')}
				onChange={onChangeAge}
				readonly={readonly}
			/>
			<Input
				className={cls.input}
				value={data?.city}
				placeholder={t('Город')}
				onChange={onChangeCity}
				readonly={readonly}
			/>
			<Input
				className={cls.input}
				value={data?.username}
				placeholder={t('Имя пользователя')}
				onChange={onChangeUsername}
				readonly={readonly}
			/>
			<Input
				className={cls.input}
				value={data?.avatar}
				placeholder={t('Аватар')}
				onChange={onChangeAvatar}
				readonly={readonly}
			/>
			<CurrencySelect
				className={cls.input}
				value={data?.currency}
				onChange={onChangeCurrency}
				readonly={readonly}
			/>
			<CountrySelect
				className={cls.input}
				value={data?.country}
				onChange={onChangeCountry}
				readonly={readonly}
			/>
		</VStack>
	);
});
