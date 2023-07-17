import {
	memo,
	useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getUserAuthData, isUserAdmin, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;

	const [isAuthModal, setAuthModal] = useState(false);
	const { t } = useTranslation();
	const userAuthData = useSelector(getUserAuthData);
	const isAdmin = useSelector(isUserAdmin);
	const dispatch = useDispatch();

	const onCloseModal = useCallback(() => setAuthModal(false), []);

	const onShowModal = useCallback(() => setAuthModal(true), []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
		setAuthModal(false);
	}, [dispatch]);

	if (userAuthData) {
		return (
			<div className={classNames(cls.Navbar, {}, [className])}>
				<Text className={cls.appName} title={t('Blog app')} theme={TextTheme.INVERTED} />
				<AppLink className={cls.createLink} to={RoutePath.articles_create} theme={AppLinkTheme.SECONDARY}>
					{t('Создать статью')}
				</AppLink>
				<Dropdown
					className={cls.dropdown}
					trigger={<Avatar size={30} src={userAuthData.avatar} />}
					items={[
						...(isAdmin ? [{ content: t('Админка'), href: RoutePath.admin_panel }] : []),
						{ content: t('Профиль'), href: RoutePath.profile + userAuthData.id },
						{ content: t('Выйти'), onClick: onLogout },
					]}
				/>
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
