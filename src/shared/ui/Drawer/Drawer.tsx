import { ReactNode, memo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';

import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
	className?: string
	children: ReactNode
	isOpen?: boolean
	onClose?: () => void
	laze?: boolean
}

export const Drawer = memo((props: DrawerProps) => {
	const {
		className,
		children,
		isOpen,
		onClose,
		laze,
	} = props;

	const { close, isClosing, isMounted } = useModal({ animationDelay: 300, onClose, isOpen });

	const mods: Mods = { [cls.open]: isOpen, [cls.isClosing]: isClosing };

	if (laze && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(cls.Drawer, mods, [className, 'app_drawer'])}>
				<Overlay onClick={close} />
				<div className={cls.content}>
					{children}
				</div>
			</div>
		</Portal>
	);
});
