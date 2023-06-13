import {
	useCallback, useState, memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import { getUserAuthData, userActions } from 'entities/User';

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
