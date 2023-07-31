import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

interface ForbiddenPageProps {
	className?: string
}

export const ForbiddenPage = memo((props: ForbiddenPageProps) => {
	const {
		className,
	} = props;

	const { t } = useTranslation();

	return (
		<Page className={className} data-testid="ForbiddenPage">
			{t('Forbidden page')}
		</Page>
	);
});
