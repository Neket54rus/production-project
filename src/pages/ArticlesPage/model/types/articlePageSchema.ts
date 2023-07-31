import { EntityState } from '@reduxjs/toolkit';

import {
    Article, ArticleSortField, ArticleType, ArticleView,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export interface ArticlePageSchema extends EntityState<Article> {
	isLoading?: boolean
	error?: string
	// pagination
	page: number
	limit: number
	hasMore: boolean
	_inited: boolean
	// filter
	view: ArticleView
	oreder: SortOrder
	sort: ArticleSortField
	search: string
	type: ArticleType
}
