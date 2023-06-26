import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';

import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlePageSchema } from '../types/articlePageSchema';

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
		page: 1,
		hasMore: true,
		_inited: false,
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
		},
		initState: (state) => {
			const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
			state.view = view;
			state.limit = view === ArticleView.BIG ? 4 : 9;
			state._inited = true;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
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
			articleAdapter.addMany(state, action.payload);
			state.hasMore = action.payload.length > 0;
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
