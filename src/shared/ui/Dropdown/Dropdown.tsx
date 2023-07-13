import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';

import { AppLink } from '../AppLink';
import { VStack } from '../Stack';

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

	const optionsClasses = [cls[direction.replace(/ /g, '-')]];

	return (
		<Menu
			className={classNames(cls.Dropdown, {}, [className])}
			as="div"
		>
			<Menu.Button className={cls.btn}>
				{trigger && trigger}
			</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, optionsClasses)}>
				<VStack>
					{items.map((item) => {
						const content = ({ active }: {active: boolean}) => (
							<button
								className={classNames(cls.item, { [cls.active]: active })}
								onClick={item.onClick}
								type="button"
								disabled={item.disabled}
							>
								{item.content}
							</button>
						);

						if (item.href) {
							return (
								<Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
									{content}
								</Menu.Item>
							);
						}

						return (
							<Menu.Item as={Fragment} disabled={item.disabled}>
								{content}
							</Menu.Item>
						);
					})}
				</VStack>
			</Menu.Items>
		</Menu>
	);
};
