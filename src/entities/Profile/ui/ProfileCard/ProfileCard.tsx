import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';

import { Input } from 'shared/ui/Input/Input';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const { className } = props;

	const { t } = useTranslation('profile');
	const data = useSelector(getProfileData);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>
			<div className={cls.header}>
				<Text title={t('Профиль')} />
				<Button className={cls.editBtn} theme={ButtonTheme.OUTLINE}>{t('Редактировать')}</Button>
			</div>
			<div className={cls.data}>
				<Input className={cls.input} value={data?.first} placeholder={t('Имя')} />
				<Input className={cls.input} value={data?.lastname} placeholder={t('Фамилия')} />
			</div>
		</div>
	);
});
