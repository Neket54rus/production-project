import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';

import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ArticlePageSchema } from '../types/articlePageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const articleAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id,
});

export const getArticles = articleAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articleAdapter.getInitialState(),
);

export const articlePageSlice = createSlice({
	name: 'articlePage',
	initialState: articleAdapter.getInitialState<ArticlePageSchema>({
		view: ArticleView.SMALL,
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
		},
		initState: (state) => {
			state.view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchArticlesList.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
			state.error = undefined;
			state.isLoading = false;
			articleAdapter.setAll(state, action.payload);
		});
		builder.addCase(fetchArticlesList.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});
	},
});

export const {
	reducer: articlePageReducer,
	actions: articlePageActions,
} = articlePageSlice;
