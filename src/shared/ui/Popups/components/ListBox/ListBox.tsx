import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';

import { Button } from '../../../Button';
import { HStack } from '../../../Stack';
import { optionsClasses } from '../../styles/consts';

import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';

export interface ListBoxItems {
	value: string
	content: ReactNode
	disabled?: boolean
}

interface ListBoxProps {
	items?: ListBoxItems[]
	className?: string
	value?: string
	defaultValue?: string
	onChange: (value: string) => void
	readonly?: boolean
	direction?: DropdownDirection
	label?: string
}

export const ListBox = (props: ListBoxProps) => {
	const { items, className, value, defaultValue, onChange, readonly, direction = 'bottom left', label } = props;

	return (
		<HStack align="center" gap="4">
			{label && <span className={cls.label}>{`${label}>`}</span>}
			<HListBox
				className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
				value={value}
				onChange={onChange}
				as="div"
				disabled={readonly}
			>
				<HListBox.Button className={cls.trigger} disabled={readonly}>
					<Button disabled={readonly}>
						{value ?? defaultValue}
					</Button>
				</HListBox.Button>
				<HListBox.Options className={classNames(cls.options, {}, optionsClasses(direction))}>
					{items?.map((item) => (
						<HListBox.Option
							key={item.value}
							value={item.value}
							disabled={item.disabled}
							as={Fragment}
						>
							{({ active, selected }) => (
								<li
									className={classNames(
										cls.item,
										{ [popupCls.active]: active, [popupCls.disabled]: item.disabled },
										[],
									)}
								>
									{selected && '!!!'}
									{item.content}
								</li>
							)}
						</HListBox.Option>
					))}
				</HListBox.Options>
			</HListBox>
		</HStack>
	);
};
