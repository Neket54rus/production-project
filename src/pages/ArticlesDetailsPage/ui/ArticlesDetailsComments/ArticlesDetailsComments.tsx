import { Suspense, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/AddCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextSize } from '@/shared/ui/Text';

import { Spinner } from '@/shared/ui/Spinner';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
	fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';

import cls from './ArticlesDetailsComments.module.scss';

interface ArticlesDetailsCommentsProps {
	className?: string
	id?: string
}

export const ArticlesDetailsComments = memo((props: ArticlesDetailsCommentsProps) => {
	const {
		className,
		id,
	} = props;

	const dispatch = useAppDispatch();
	const { t } = useTranslation('articles-details');

	const comments = useSelector(getArticleComments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch],
	);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	});

	return (
		<div className={classNames('', {}, [className])}>
			<Text className={cls.commentTitle} title={t('Комментарии')} size={TextSize.L} />
			<Suspense fallback={<Spinner />}>
				<AddCommentForm onSendComment={onSendComment} />
			</Suspense>
			<CommentList comments={comments} isLoading={isLoading} />
		</div>
	);
});
