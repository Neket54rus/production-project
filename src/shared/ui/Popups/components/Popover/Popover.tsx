import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { optionsClasses } from '../../styles/consts';
import popoverCls from '../../styles/popup.module.scss';

import cls from './Popover.module.scss';

interface PopoverProps {
	className?: string
	direction?: DropdownDirection
	trigger: ReactNode
	children: ReactNode
}

export function Popover(props: PopoverProps) {
	const {
		className,
		direction = 'bottom right',
		trigger,
		children,
	} = props;

	return (
		<HPopover className={classNames(cls.Popover, {}, [className, popoverCls.popup])}>
			<HPopover.Button className={popoverCls.btn} as="div">
				{trigger}
			</HPopover.Button>
			<HPopover.Panel className={classNames(cls.menu, {}, optionsClasses(direction))}>
				{children}
			</HPopover.Panel>
		</HPopover>
	);
}
