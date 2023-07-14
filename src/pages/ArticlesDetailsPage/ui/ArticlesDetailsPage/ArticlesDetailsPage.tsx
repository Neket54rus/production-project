import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from 'entities/Article';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';

import { articleDetailsPageReducer } from '../../model/slice';
import { ArticlesDetailsPageHeader } from '../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader';

import { ArticlesDetailsComments } from '../ArticlesDetailsComments/ArticlesDetailsComments';
import cls from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
	const { className } = props;

	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation('articles-details');

	if (!id) {
		return <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>{t('Id not found!')}</Page>;
	}

	return (
		<DynamicModuleLoader removeAfterUnmount reducers={reducers}>
			<Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
				<ArticlesDetailsPageHeader />
				<ArticleDetails id={id!} />
				<ArticleRecommendationsList />
				<ArticlesDetailsComments id={id} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesDetailsPage);
