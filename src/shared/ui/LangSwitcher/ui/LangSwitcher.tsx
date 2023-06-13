import { memo, type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';

import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
    className?: string
    short?: boolean
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
	const { className, short } = props;

	const { t, i18n } = useTranslation();

	const language = i18n.language === 'ru' ? 'en' : 'ru';
	const translate = () => {
		i18n.changeLanguage(language);
	};

	return (
		<Button
			className={classNames(
				cls.LangSwitcher,
				{ [cls.short]: short },
				[className],
			)}
			theme={ButtonTheme.CLEAR}
			onClick={translate}
		>
			{t(short ? 'Коротный язык' : 'Язык')}
		</Button>
	);
});
