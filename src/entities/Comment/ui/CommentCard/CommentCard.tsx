import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';

import { Comment } from '../../model/types/comment';

import cls from './CommentCard.module.scss';

interface CommentCardProps {
	className?: string
	comment?: Comment
	isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
	const {
		className,
		comment,
		isLoading,
	} = props;

	if (isLoading) {
		return (
			<div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
				<div className={cls.header}>
					<Skeleton border="50%" width={30} height={30} />
					<Skeleton className={cls.username} height={16} width={100} />
				</div>
				<Skeleton className={cls.text} width="100%" height={50} />
			</div>
		);
	}

	if (!comment) {
		return null;
	}

	return (
		<div className={classNames(cls.CommentCard, {}, [className])}>
			<AppLink className={cls.header} to={getRouteProfile(comment.user.id)}>
				{comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
				<Text className={cls.username} title={comment.user.username} />
			</AppLink>
			<Text className={cls.text} text={comment.text} />
		</div>
	);
});
