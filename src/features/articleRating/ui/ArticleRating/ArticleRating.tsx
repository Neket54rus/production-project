import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/RatingCard';

import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';

export interface ArticleRatingProps {
	className?: string
	articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
	const {
		className,
		articleId,
	} = props;

	const { t } = useTranslation();
	const userData = useSelector(getUserAuthData);
	const { data, isLoading } = useGetArticleRating({
		articleId,
		userId: userData?.id ?? '',
	});
	const [rateArticleMutation] = useRateArticle();

	const rating = data?.[0];

	const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
		try {
			rateArticleMutation({
				userId: userData?.id ?? '',
				articleId,
				rate: starsCount,
				feedback,
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(`rateArticleMutation - ${error}`);
		}
	}, [articleId, rateArticleMutation, userData?.id]);

	const onCancel = useCallback((starsCount: number) => {
		handleRateArticle(starsCount);
	}, [handleRateArticle]);

	const onAccept = useCallback((starsCount: number, feedback?: string) => {
		handleRateArticle(starsCount, feedback);
	}, [handleRateArticle]);

	if (isLoading) {
		return <Skeleton width="100%" height={120} />;
	}

	return (
		<RatingCard
			className={className}
			title={t('Оцените статью')}
			feedbackTitle={t('Оставьте свой отзыв')}
			hasFeedback
			rate={rating?.rate}
			onAccept={onAccept}
			onCancel={onCancel}
		/>
	);
});

export default ArticleRating;
