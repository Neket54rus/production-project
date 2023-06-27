import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
	fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleCommemments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleRecommendations } from '../../model/slice/articleDetailsPageRecommendationsSlice';
import { ArticlesDetailsPageHeader } from '../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader';

import cls from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetaislPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
	const { className } = props;

	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation('articles-details');
	const dispatch = useAppDispatch();

	const comments = useSelector(getArticleCommemments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);
	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchArticleRecommendations());
	});

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch],
	);

	if (!id) {
		return <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>{t('Id not found!')}</Page>;
	}

	return (
		<DynamicModuleLoader removeAfterUnmount reducers={reducers}>
			<Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
				<ArticlesDetailsPageHeader />
				<ArticleDetails id={id!} />
				<Text className={cls.commentTitle} title={t('Рекомендуем')} size={TextSize.L} />
				<ArticleList
					className={cls.recommendations}
					articles={recommendations}
					isLoading={recommendationsIsLoading}
					target="_blank"
				/>
				<Text className={cls.commentTitle} title={t('Комментарии')} size={TextSize.L} />
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList comments={comments} isLoading={isLoading} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesDetailsPage);
