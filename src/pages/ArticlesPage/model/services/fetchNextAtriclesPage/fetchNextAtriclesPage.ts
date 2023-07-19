import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import {
	getArticlesPageHasMore,
	getArticlesPageIsLoading,
} from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/fetchNextArticlesPage',
	async (_, thunkApi) => {
		const { getState, dispatch } = thunkApi;

		const hasMore = getArticlesPageHasMore(getState());
		const isLoading = getArticlesPageIsLoading(getState());

		if (hasMore && !isLoading) {
			dispatch(fetchArticlesList({}));
		}
	},
);
