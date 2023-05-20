import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button';

import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
    const { className } = props;

    const { t, i18n } = useTranslation();
    const language = i18n.language === 'ru' ? 'en' : 'ru';
    const translate = () => {
        i18n.changeLanguage(language);
    };

    return (
        <Button
            className={classNames(cls.LangSwitcher, {}, [className])}
            theme={ThemeButton.CLEAR}
            onClick={translate}
        >
            {t('Язык')}
        </Button>
    );
};
