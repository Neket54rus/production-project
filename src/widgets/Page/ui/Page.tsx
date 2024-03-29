import {
	MutableRefObject, ReactNode,
	UIEvent,
	memo, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import { UIActions, getUIScrollByPath } from '@/features/UI';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps {
	className?: string
	children: ReactNode
	onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
	const {
		className,
		children,
		onScrollEnd,
	} = props;

	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
	const dispatch = useAppDispatch();
	const location = useLocation();
	const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, location.pathname));

	useInfiniteScroll({
		wrapperRef,
		triggerRef,
		cb: onScrollEnd,
	});

	useInitialEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition;
	});

	const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
		dispatch(UIActions.setScrollPosition({
			position: event.currentTarget.scrollTop,
			path: location.pathname,
		}));
	}, 500);

	return (
		<main
			className={classNames(cls.Page, {}, [className])}
			ref={wrapperRef}
			onScroll={onScroll}
			data-testid={props['data-testid'] ?? 'Page'}
		>
			{children}
			{onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
		</main>
	);
});
