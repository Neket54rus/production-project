import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetaislPage?.comments?.isLoading;
export const getArticleCommentsError = (state: StateSchema) => state.articleDetaislPage?.comments?.error;
