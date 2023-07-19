import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {
	onClose?: () => void
	isOpen?: boolean
	animationDelay?: number
}

export function useModal(props: UseModalProps) {
	const {
		onClose,
		isOpen,
		animationDelay = 0,
	} = props;

	const [isClosing, setClosing] = useState(false);
	const [isMounted, setMounted] = useState(false);
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

	const close = useCallback(() => {
		if (onClose) {
			setClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setClosing(false);
			}, animationDelay);
		}
	}, [animationDelay, onClose]);

	const onKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			close();
		}
	}, [close]);

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

	return {
		isClosing,
		isMounted,
		close,
	};
}
