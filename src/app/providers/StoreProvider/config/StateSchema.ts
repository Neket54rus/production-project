import {
	AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { AddCommentFormSchema } from 'features/AddCommentForm';
import { LoginSchema } from 'features/AuthByUsername';
import { UISchema } from 'features/UI';
import { ArticleDetailsCommentSchema } from 'pages/ArticlesDetailsPage';
import { ArticlePageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
	ui: UISchema

	// Async reducers
    loginForm?:LoginSchema
	profile?: ProfileSchema
	articleDetails?: ArticleDetailsSchema
	articleDetailsComments?: ArticleDetailsCommentSchema
	addCommentForm?: AddCommentFormSchema
	articlesPage?: ArticlePageSchema
}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
	add: (key: StateSchemaKey, reducer: Reducer) => void
	remove: (key: StateSchemaKey) => void
	getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore {
	reducerManager: ReducerManager
}

export interface ThunExtraArg {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T
	extra: ThunExtraArg
	state: StateSchema
}
