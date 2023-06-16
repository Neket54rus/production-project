import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
	className?: string
}

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
	const {
		className,
	} = props;

	return (
		<div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
			Articles Details Page
		</div>
	);
};

export default memo(ArticlesDetailsPage);
