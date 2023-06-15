import {
	ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps =
	Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
	className?: string
	value?: string | number
	onChange?: (value: string) => void
	autofocus?: boolean
	readonly?: boolean
}

export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autofocus,
		readonly,
		...otherProps
	} = props;

	const [isFocused, setFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);

	const ref = useRef<HTMLInputElement>(null);

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		onChange?.(event.target.value);
		setCaretPosition(event.target.value.length);
	};

	const onBlur = () => {
		setFocused(false);
	};

	const onFocus = () => {
		setFocused(true);
	};

	const onSelect = (event: any) => {
		setCaretPosition(event?.target?.selectionStart || 0);
	};

	const isCaretVisible = isFocused && !readonly;

	useEffect(() => {
		if (autofocus) {
			setFocused(true);
			ref.current?.focus();
		}
	}, [autofocus]);

	return (
		<div className={classNames(
			cls.InputWrapper,
			{ [cls.readonly]: readonly },
			[className],
		)}
		>
			{placeholder && (
				<div className={cls.placeholder}>
					{`${placeholder}>`}
				</div>
			)}
			<div className={cls.caretWrapper}>
				<input
					ref={ref}
					type={type}
					value={value}
					onChange={onChangeHandler}
					className={cls.input}
					onBlur={onBlur}
					onFocus={onFocus}
					onSelect={onSelect}
					readOnly={readonly}
					{...otherProps}
				/>
				{isCaretVisible
					&& (
						<span
							className={cls.caret}
							style={{ left: `${caretPosition * 9}px` }}
						/>
					)}
			</div>
		</div>
	);
});
