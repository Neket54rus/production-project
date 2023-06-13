import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { ButtonSize } from 'shared/ui/Button/ui/Button';
import { AppLink } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-icon.svg';
import MainIcon from 'shared/assets/icons/main-icon.svg';

import cls from './Sidebar.module.scss';

interface SidebarProps {
	className?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
	const { className } = props;

	const [collapsed, setCollapsed] = useState(false);

	const { t } = useTranslation();

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<div
			className={classNames(
				cls.Sidebar,
				{ [cls.collapsed]: collapsed },
				[className],
			)}
			data-testid="sidebar"
		>
			<Button
				type="button"
				onClick={onToggle}
				data-testid="sidebar-toggle"
				className={cls.collapseBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				square
				size={ButtonSize.L}
			>
				{collapsed ? '>' : '<'}
			</Button>
			<div className={cls.items}>
				<AppLink to={RoutePath.main} className={cls.item}>
					<MainIcon className={cls.icon} />
					<span className={cls.link}>
						{t('Главная')}
					</span>
				</AppLink>
				<AppLink to={RoutePath.about} className={cls.item}>
					<AboutIcon className={cls.icon} />
					<span className={cls.link}>
						{t('О сайте')}
					</span>
				</AppLink>
			</div>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} />
			</div>
		</div>
	);
};
