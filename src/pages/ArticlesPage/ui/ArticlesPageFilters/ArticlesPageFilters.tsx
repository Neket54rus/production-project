import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
	ArticleSortField,
	ArticleType,
	ArticleTypeTabs, ArticleView, ArticleViewSelector,
} from '@/entities/Article';
import { ArticleSortSelector } from '@/entities/ArticleSortSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';

import {
	getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlePageActions } from '../../model/slice/articlePageSlice';

import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
	className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
	const {
		className,
	} = props;

	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const view = useSelector(getArticlesPageView);
	const sort = useSelector(getArticlesPageSort);
	const order = useSelector(getArticlesPageOrder);
	const search = useSelector(getArticlesPageSearch);
	const type = useSelector(getArticlesPageType);

	const fetchData = useCallback(() => {
		dispatch(fetchArticlesList({ replace: true }));
	}, [dispatch]);

	const debounceFetchData = useDebounce(fetchData, 500);

	const onChangeView = useCallback((view: ArticleView) => {
		dispatch(articlePageActions.setView(view));
	}, [dispatch]);

	const onChangeSort = useCallback((sort: ArticleSortField) => {
		dispatch(articlePageActions.setSort(sort));
		dispatch(articlePageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeOrder = useCallback((order: SortOrder) => {
		dispatch(articlePageActions.setOrder(order));
		dispatch(articlePageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeSearch = useCallback((search: string) => {
		dispatch(articlePageActions.setSearch(search));
		dispatch(articlePageActions.setPage(1));
		debounceFetchData();
	}, [dispatch, debounceFetchData]);

	const onChangeType = useCallback((value: ArticleType) => {
		dispatch(articlePageActions.setType(value));
		dispatch(articlePageActions.setPage(1));
		fetchData();
	}, [fetchData, dispatch]);

	return (
		<div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
			<div className={cls.sortWrapper}>
				<ArticleSortSelector
					order={order}
					sort={sort}
					onChangeOrder={onChangeOrder}
					onChangeSort={onChangeSort}
				/>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
			</div>
			<Card className={cls.search}>
				<Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
			</Card>
			<ArticleTypeTabs className={cls.tabs} onChangeTab={onChangeType} value={type} />
		</div>
	);
});
