import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

import cls from './ArticleList.module.scss';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
	className?: string
	articles: Article[]
	isLoading?: boolean
	view?: ArticleView
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
	.fill(0)
	.map((_, index) => (
		<ArticleListItemSkeleton
			className={cls.card}
			key={index}
			view={view}
		/>
	));

export const ArticleList = memo((props: ArticleListProps) => {
	const {
		className,
		articles,
		isLoading,
		view = ArticleView.SMALL,
	} = props;

	if (isLoading) {
		return (
			<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
				{getSkeletons(view)}
			</div>
		);
	}

	const renderArticle = (article: Article) => (
		<ArticleListItem
			className={cls.card}
			key={article.id}
			article={article}
			view={view}
		/>
	);

	return (
		<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
			{articles.length > 0
				? articles.map(renderArticle)
				: null}
		</div>
	);
});