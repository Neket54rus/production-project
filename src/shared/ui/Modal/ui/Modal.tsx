import {
	FC,
	MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';

import { Overlay } from '../../Overlay/Overlay';
import { Portal } from '../../Portal';

import cls from './Modal.module.scss';

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean,
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
	const {
		className,
		children,
		isOpen,
		onClose,
		lazy,
	} = props;

	const [isClosing, setClosing] = useState(false);
	const [isMounted, setMounted] = useState(false);
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

	const closeHandler = useCallback(() => {
		if (onClose) {
			setClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeHandler();
		}
	}, [closeHandler]);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			clearInterval(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	useEffect(() => {
		if (isOpen) {
			setMounted(true);
		}
	}, [isOpen]);

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	};

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(
				cls.Modal,
				mods,
				[className, 'app_modal'],
			)}
			>
				<Overlay onClick={closeHandler} />
				<div className={cls.content}>
					{children}
				</div>
			</div>
		</Portal>

	);
};
