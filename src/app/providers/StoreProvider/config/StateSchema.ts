import {
	AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';

import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { ArticleDetailsSchema } from 'entities/Article';
import { LoginSchema } from 'features/AuthByUsername';
import { AddCommentFormSchema } from 'features/AddCommentForm';
import { ArticleDetailsCommentSchema } from 'pages/ArticlesDetailsPage';
import { ArticlePageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema

	// Async reducers
    loginForm?:LoginSchema
	profile?: ProfileSchema
	articleDetails?: ArticleDetailsSchema
	articleDetailsComments?: ArticleDetailsCommentSchema
	addCommentForm?: AddCommentFormSchema
	articlesPage?: ArticlePageSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
	add: (key: StateSchemaKey, reducer: Reducer) => void
	remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore {
	reducerManager: ReducerManager
}

export interface ThunExtraArg {
	api: AxiosInstance
	navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
	rejectValue: T
	extra: ThunExtraArg
	state: StateSchema
}
