import {
	ChangeEvent,
	useMemo,
} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
	value: T
	content: string
}

interface SelectProps<T extends string> {
    className?: string
	label?: string
	options?: SelectOption<T>[]
	value?: T
	onChange?: (value: T) => void
	readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
	const {
		className,
		label,
		options,
		value,
		onChange,
		readonly,
	} = props;

	const optionsList = useMemo(
		() => options?.map((item) => (
			<option className={cls.option} value={item.value} key={item.value}>
				{item.content}
			</option>
		)),
		[options],
	);

	const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(event.target.value as T);
	};

	return (
		<div
			className={classNames(cls.Wrapper, {}, [className])}
		>
			{label && <span className={cls.label}>{`${label}>`}</span>}
			<select className={cls.select} value={value} onChange={onChangeHandler} disabled={readonly}>
				{optionsList}
			</select>
		</div>
	);
};
