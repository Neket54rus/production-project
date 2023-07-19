import { memo } from 'react';

import { NotificationList } from 'entities/Notification';
import NotificationIcon from 'shared/assets/icons/notification-icon.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
	className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
	const {
		className,
	} = props;

	return (
		<Popover
			className={classNames(cls.NotificationButton, {}, [className])}
			trigger={(
				<Button theme={ButtonTheme.CLEAR}>
					<Icon Svg={NotificationIcon} inverted />
				</Button>
			)}
			direction="bottom left"
		>
			<NotificationList className={cls.notifications} />
		</Popover>
	);
});
