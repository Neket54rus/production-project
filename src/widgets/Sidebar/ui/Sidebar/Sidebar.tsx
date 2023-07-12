import {
	memo,
	useMemo,
	useState,
} from 'react';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { ButtonSize } from 'shared/ui/Button/ui/Button';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import cls from './Sidebar.module.scss';

interface SidebarProps {
	className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;

	const [collapsed, setCollapsed] = useState(false);
	const sidebarItemsList = useSelector(getSidebarItems);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	const itemsList = useMemo(() => (
		sidebarItemsList.map((item) => (
			<SidebarItem key={item.path} item={item} collapsed={collapsed} />
		))
	), [collapsed, sidebarItemsList]);

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
