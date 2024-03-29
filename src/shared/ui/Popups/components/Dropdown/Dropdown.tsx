import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { AppLink } from '../../../AppLink';
import { VStack } from '../../../Stack';
import { optionsClasses } from '../../styles/consts';

import popupCls from '../../styles/popup.module.scss';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
	disabled?: boolean
	content: ReactNode
	onClick?: () => void
	href?: string
}

interface DropdownProps {
	className?: string
	items: DropdownItem[]
	trigger?: ReactNode
	direction?: DropdownDirection
}

export const Dropdown = (props: DropdownProps) => {
	const { className, trigger, items, direction = 'bottom left' } = props;

	return (
		<Menu
			className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
			as="div"
		>
			<Menu.Button className={cls.btn}>
				{trigger && trigger}
			</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, optionsClasses(direction))}>
				<VStack>
					{items.map((item, index) => {
						const content = ({ active }: {active: boolean}) => (
							<button
								className={classNames(cls.item, { [popupCls.active]: active })}
								onClick={item.onClick}
								type="button"
								disabled={item.disabled}
							>
								{item.content}
							</button>
						);

						if (item.href) {
							return (
								<Menu.Item
									as={AppLink}
									to={item.href}
									disabled={item.disabled}
									key={`dropdown-key-${index}`}
								>
									{content}
								</Menu.Item>
							);
						}

						return (
							<Menu.Item as={Fragment} disabled={item.disabled} key={`dropdown-key-${index}`}>
								{content}
							</Menu.Item>
						);
					})}
				</VStack>
			</Menu.Items>
		</Menu>
	);
};
