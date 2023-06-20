import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AppLink } from 'shared/ui/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUserAuthData } from 'entities/User';

import { SidebarItemType } from '../../model/types/sidebar';

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
	item: SidebarItemType
	collapsed: boolean
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { item, collapsed } = props;

	const { t } = useTranslation();
	const isAuth = useSelector(getUserAuthData);

	if (item.authOnly && !isAuth) {
		return null;
	}

	return (
		<AppLink to={item.path} className={classNames(cls.item, { [cls.collapsed]: collapsed }, [''])}>
			<item.Icon className={cls.icon} />
			<span className={cls.link}>
				{t(item.text)}
			</span>
		</AppLink>
	);
});
