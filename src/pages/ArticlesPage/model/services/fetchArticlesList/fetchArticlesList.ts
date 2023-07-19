import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';

import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
	getArticlesPageLimit,
	getArticlesPageOrder,
	getArticlesPagePage,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
	replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
	'articlesPage/fetchArticlesList',
	async (props, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;
		const limit = getArticlesPageLimit(getState());

		const sort = getArticlesPageSort(getState());
		const order = getArticlesPageOrder(getState());
		const search = getArticlesPageSearch(getState());
		const page = getArticlesPagePage(getState());
		const type = getArticlesPageType(getState());

		try {
			addQueryParams({
				sort, order, search, type,
			});

			const response = await extra.api.get<Article[]>('/articles', {
				params: {
					_expand: 'user',
					_limit: limit,
					_page: page,
					_sort: sort,
					_order: order,
					q: search,
					type: type === ArticleType.All ? undefined : type,
				},
			});

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch {
			return rejectWithValue('error');
		}
	},
);
