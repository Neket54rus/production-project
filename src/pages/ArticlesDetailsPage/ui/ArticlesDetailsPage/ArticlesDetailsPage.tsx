import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';

import { articleDetailsPageReducer } from '../../model/slice';
import { ArticlesDetailsComments } from '../ArticlesDetailsComments/ArticlesDetailsComments';
import { ArticlesDetailsPageHeader } from '../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader';

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

	return (
		<DynamicModuleLoader removeAfterUnmount reducers={reducers}>
			<Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
				<ArticlesDetailsPageHeader />
				<ArticleDetails id={id} />
				<ArticleRecommendationsList />
				<ArticlesDetailsComments id={id} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesDetailsPage);
