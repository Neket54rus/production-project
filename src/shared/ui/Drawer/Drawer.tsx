import { ReactNode, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
	className?: string
	children: ReactNode
	isOpen?: boolean
	onClose?: () => void
}

export const Drawer = memo((props: DrawerProps) => {
	const {
		className,
		children,
		isOpen,
		onClose,
	} = props;

	return (
		<Portal>
			<div className={classNames(cls.Drawer, { [cls.open]: isOpen }, [className, 'app_drawer'])}>
				<Overlay onClick={onClose} />
				<div className={cls.content}>
					{children}
				</div>
			</div>
		</Portal>
	);
});
