import {
	memo,
	useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { getRouteArticlesCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;

	const [isAuthModal, setAuthModal] = useState(false);
	const { t } = useTranslation();
	const userAuthData = useSelector(getUserAuthData);

	const onCloseModal = useCallback(() => setAuthModal(false), []);

	const onShowModal = useCallback(() => setAuthModal(true), []);

	if (userAuthData) {
		return (
			<div className={classNames(cls.Navbar, {}, [className])}>
				<Text className={cls.appName} title={t('Blog app')} theme={TextTheme.INVERTED} />
				<AppLink className={cls.createLink} to={getRouteArticlesCreate()} theme={AppLinkTheme.SECONDARY}>
					{t('Создать статью')}
				</AppLink>
				<HStack className={cls.actions} gap="16" align="center">
					<NotificationButton />
					<AvatarDropdown />
				</HStack>
			</div>
		);
	}

	return (
		<div className={classNames(cls.Navbar, {}, [className])}>
			<Button
				className={cls.links}
				theme={ButtonTheme.CLEAR_INVERTED}
				onClick={onShowModal}
			>
				{t('Войти')}
			</Button>
			{isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
		</div>
	);
});
