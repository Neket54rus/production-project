import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
	className?: string
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
	const {
		className,
	} = props;

	const { t } = useTranslation();

	return (
		<Page className={className} data-testid="AdminPanelPage">
			{t('Админ панель')}
		</Page>
	);
});

export default AdminPanelPage;
