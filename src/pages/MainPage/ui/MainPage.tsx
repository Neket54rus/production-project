import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/RatingCard';
import { Page } from '@/widgets/Page/Page';

function MainPage() {
	const { t } = useTranslation('main');

	return (
		<Page>
			{t('Главная страница')}
			<RatingCard title={t('Оцените статью')} feedbackTitle={t('Оставьте отзыв')} hasFeedback />
		</Page>
	);
}

export default MainPage;
