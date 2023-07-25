import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
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
		<Page className={classNames('', {}, [className])}>
			{t('У вас нет доступа к этой странице')}
		</Page>
	);
});

export default AdminPanelPage;
