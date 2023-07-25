import {
	memo,
	useMemo,
	useState,
} from 'react';
import { useSelector } from 'react-redux';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { LangSwitcher } from '@/shared/ui/LangSwitcher';

import { VStack } from '@/shared/ui/Stack';
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
		<aside
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
			<VStack className={cls.items} gap="8">
				{itemsList}
			</VStack>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} />
			</div>
		</aside>
	);
});
