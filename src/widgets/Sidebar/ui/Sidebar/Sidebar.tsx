import {
	useState, useMemo, memo,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { ButtonSize } from 'shared/ui/Button/ui/Button';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarItemsList } from '../../model/items';

import cls from './Sidebar.module.scss';

interface SidebarProps {
	className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;

	const [collapsed, setCollapsed] = useState(false);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	const itemsList = useMemo(() => (
		SidebarItemsList.map((item) => (
			<SidebarItem key={item.path} item={item} collapsed={collapsed} />
		))
	), [collapsed]);

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
				{itemsList}
			</div>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} />
			</div>
		</div>
	);
});
