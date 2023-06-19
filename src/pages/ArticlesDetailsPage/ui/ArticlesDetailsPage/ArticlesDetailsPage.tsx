import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ArticlesDetailsPageProps {
	className?: string
}

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
	const {
		className,
	} = props;

	const { id } = useParams<{ id: string}>();
	const { t } = useTranslation();

	if (!id) {
		return (
			<div className={classNames('', {}, [className])}>
				{t('Id not found!')}
			</div>
		);
	}

	return (
		<div className={classNames('', {}, [className])}>
			<ArticleDetails id={id!} />
		</div>
	);
};

export default memo(ArticlesDetailsPage);
