import {
	memo,
	useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
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
				<Button
					className={cls.links}
					theme={ButtonTheme.CLEAR_INVERTED}
					onClick={onLogout}
				>
					{t('Выйти')}
				</Button>
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
