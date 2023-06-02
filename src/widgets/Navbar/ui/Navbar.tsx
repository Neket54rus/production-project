import { type FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal';
import { Button, ButtonTheme } from 'shared/ui/Button';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props;

    const [isAuthModal, setAuthModal] = useState(false);

    const { t } = useTranslation();

    const onToggleModal = useCallback(() => {
        setAuthModal((prevState) => !prevState);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                className={cls.links}
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            <Modal
                isOpen={isAuthModal}
                onClose={onToggleModal}
            >
                {t(`
                    Lorem ipsum dolor sit amet, consectetur 
                    adipisicing elit. Alias, aspernatur.
                `)}
            </Modal>
        </div>
    );
};
