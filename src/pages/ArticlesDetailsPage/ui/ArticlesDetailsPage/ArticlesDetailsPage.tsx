import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import {
	addCommentForArticle,
} from 'pages/ArticlesDetailsPage/model/services/addCommentForArticle/addCommentForArticle';

import { Page } from 'shared/ui/Page/Page';
import {
	fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { articleDetailsCommentsReducer, getArticleCommemments } from '../../model/slice/articleDetailsCommentsSlice';

import cls from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
	className?: string
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
	const {
		className,
	} = props;

	const { id } = useParams<{ id: string}>();
	const { t } = useTranslation('articles-details');
	const comments = useSelector(getArticleCommemments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

	const onSendComment = useCallback((text: string) => {
		dispatch(addCommentForArticle(text));
	}, [dispatch]);

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles);
	}, [navigate]);

	if (!id) {
		return (
			<Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
				{t('Id not found!')}
			</Page>
		);
	}

	return (
		<DynamicModuleLoader removeAfterUnmount reducers={reducers}>
			<Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
				<Button onClick={onBackToList}>
					{t('Назад к списку')}
				</Button>
				<ArticleDetails id={id!} />
				<Text className={cls.commentTitle} title={t('Комментарии')} />
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList comments={comments} isLoading={isLoading} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesDetailsPage);
