import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';

interface ForbiddenPageProps {
	className?: string
}

export const ForbiddenPage = memo((props: ForbiddenPageProps) => {
	const {
		className,
	} = props;

	return (
		<Page className={classNames('', {}, [className])}>
			Forbidden page
		</Page>
	);
});
