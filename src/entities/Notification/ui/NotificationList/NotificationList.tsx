import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { VStack } from 'shared/ui/Stack';

import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

import cls from './NotificationList.module.scss';

interface NotificationListProps {
	className?: string
}

export const NotificationList = memo((props: NotificationListProps) => {
	const {
		className,
	} = props;

	const { data, isLoading } = useNotifications(null, {
		pollingInterval: 10000,
	});

	if (isLoading) {
		return (
			<VStack className={classNames(cls.NotificationList, {}, [className])} gap="16">
				{[...Array(3)].map(() => (
					<Skeleton width="100%" border="8px" height="80px" />
				))}
			</VStack>
		);
	}

	return (
		<VStack className={classNames(cls.NotificationList, {}, [className])} gap="16">
			{
				data?.map((item) => (
					<NotificationItem key={item.id} item={item} />
				))
			}
		</VStack>
	);
});
