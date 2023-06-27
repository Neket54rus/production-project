import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (state: StateSchema) => {
	return state.articleDetaislPage?.recommendations?.isLoading;
};

export const getArticleRecommendationsError = (state: StateSchema) => state.articleDetaislPage?.recommendations?.error;
