import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';
import {
	Article, ArticleSortField, ArticleType, ArticleView,
} from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { SortOrder } from 'shared/types';

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
		limit: 9,
		sort: ArticleSortField.CREATED,
		search: '',
		oreder: 'asc',
		_inited: false,
		type: ArticleType.All,
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
		setOrder: (state, action: PayloadAction<SortOrder>) => {
			state.oreder = action.payload;
		},
		setSort: (state, action: PayloadAction<ArticleSortField>) => {
			state.sort = action.payload;
		},
		setType: (state, action: PayloadAction<ArticleType>) => {
			state.type = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchArticlesList.pending, (state, action) => {
			state.error = undefined;
			state.isLoading = true;

			if (action.meta.arg.replace) {
				articleAdapter.removeAll(state);
			}
		});
		builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
			state.error = undefined;
			state.isLoading = false;
			state.hasMore = action.payload.length >= state.limit;

			if (action.meta.arg.replace) {
				articleAdapter.setAll(state, action.payload);
			} else {
				articleAdapter.addMany(state, action.payload);
			}
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
