import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
	className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
	const {
		className,
	} = props;

	const [isOpen, setOpen] = useState(false);

	const onOpenDrawer = useCallback(() => {
		setOpen(true);
	}, []);

	const onCloseDrawer = useCallback(() => {
		setOpen(false);
	}, []);

	const trigger = (
		<Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
			<Icon Svg={NotificationIcon} inverted />
		</Button>
	);

	return (
		<div>
			<BrowserView>
				<Popover
					className={classNames(cls.NotificationButton, {}, [className])}
					trigger={trigger}
					direction="bottom left"
				>
					<NotificationList className={cls.notifications} />
				</Popover>
			</BrowserView>
			<MobileView>
				{trigger}
				<Drawer isOpen={isOpen} onClose={onCloseDrawer}>
					<NotificationList />
				</Drawer>
			</MobileView>
		</div>
	);
});
