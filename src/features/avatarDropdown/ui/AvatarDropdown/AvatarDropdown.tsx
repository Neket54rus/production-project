import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

interface AvatarDropdownProps {
	className?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
	const {
		className,
	} = props;

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isAdmin = useSelector(isUserAdmin);
	const userAuthData = useSelector(getUserAuthData);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	if (!userAuthData) {
		return null;
	}

	return (
		<Dropdown
			className={classNames('', {}, [className])}
			trigger={<Avatar size={30} src={userAuthData.avatar} fallbackInverted />}
			items={[
				...(isAdmin ? [{ content: t('Админка'), href: getRouteAdminPanel() }] : []),
				{ content: t('Профиль'), href: getRouteProfile(userAuthData.id) },
				{ content: t('Выйти'), onClick: onLogout },
			]}
		/>
	);
});
