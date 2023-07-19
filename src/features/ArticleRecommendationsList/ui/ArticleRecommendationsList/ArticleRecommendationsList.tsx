import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/Text';

import { useArticleRecommendationsList } from '../../api/ArticleRecommendationsApi';

interface ArticleRecommendationsListProps {
	className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
	const {
		className,
	} = props;

	const { t } = useTranslation('articles-details');
	const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

	if (isLoading || error || !articles) {
		return null;
	}

	return (
		<VStack className={classNames('', {}, [className])} gap="8">
			<Text title={t('Рекомендуем')} size={TextSize.L} />
			<ArticleList
				articles={articles}
				target="_blank"
			/>
		</VStack>
	);
});
