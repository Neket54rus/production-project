import { memo } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList } from 'entities/Article';

import {
	getArticlesPageIsLoading,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slice/articlePageSlice';

interface ArticlesInfiniteListProps {
	className?: string
}

export const ArticlesInfiniteList = memo((props: ArticlesInfiniteListProps) => {
	const {
		className,
	} = props;

	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const view = useSelector(getArticlesPageView);

	return (
		<ArticleList
			className={className}
			isLoading={isLoading}
			view={view}
			articles={articles}
		/>
	);
});
