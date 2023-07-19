import { ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Flex.module.scss';

export type FlexJustify = 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly'
export type FlexAlign = 'center' | 'start' | 'end' | 'normal'
export type FlexDirection = 'row' | 'column' | 'columnReverse' | 'rowReverse'
export type FlexGap = '4' | '8' | '16' | '32'

const justifyClasses: Record<FlexJustify, string> = {
	center: cls.justifyCenter,
	start: cls.justifyStart,
	end: cls.justifyEnd,
	between: cls.justifyBetween,
	around: cls.justifyAround,
	evenly: cls.justifyEvenly,
};

const alignClasses: Record<FlexAlign, string> = {
	center: cls.alignCenter,
	start: cls.alignStart,
	end: cls.alignEnd,
	normal: cls.alignNormal,
};

const directionClasses: Record<FlexDirection, string> = {
	row: cls.directionRow,
	column: cls.directionColumn,
	rowReverse: cls.directionRowReverse,
	columnReverse: cls.directionColumnReverse,
};

const gapClasses: Record<FlexGap, string> = {
	4: cls.gap4,
	8: cls.gap8,
	16: cls.gap16,
	32: cls.gap32,
};

export interface FlexProps {
	className?: string
	children: ReactNode
	justify?: FlexJustify
	align?: FlexAlign
	direction: FlexDirection
	gap?: FlexGap
}

export const Flex = memo((props: FlexProps) => {
	const {
		className,
		children,
		justify = 'start',
		align = 'normal',
		direction = 'row',
		gap,
	} = props;

	const classes = [
		className,
		justifyClasses[justify],
		alignClasses[align],
		directionClasses[direction],
		gap && gapClasses[gap],
	];

	return (
		<div className={classNames(cls.Flex, {}, classes)}>
			{children}
		</div>
	);
});
