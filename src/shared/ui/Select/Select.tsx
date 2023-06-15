import {
	ChangeEvent, FC, memo, useMemo,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption {
	value: string
	content: string
}

interface SelectProps {
    className?: string
	label?: string
	options?: SelectOption[]
	value?: string
	onChange?: (value: string) => void
	readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
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
		onChange?.(event.target.value);
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
});
