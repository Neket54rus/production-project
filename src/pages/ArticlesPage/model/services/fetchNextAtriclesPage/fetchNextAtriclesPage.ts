import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import {
	getArticlesPageHasMore,
	getArticlesPageIsLoading,
	getArticlesPagePage,
} from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/fetchNextArticlesPage',
	async (_, thunkApi) => {
		const { getState, dispatch } = thunkApi;

		const hasMore = getArticlesPageHasMore(getState());
		const isLoading = getArticlesPageIsLoading(getState());
		const page = getArticlesPagePage(getState());

		if (hasMore && !isLoading) {
			dispatch(fetchArticlesList({
				page: page + 1,
			}));
		}
	},
);
