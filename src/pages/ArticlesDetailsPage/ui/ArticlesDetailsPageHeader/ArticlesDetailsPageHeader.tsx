import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticles, getRouteArticlesEdit } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';

import { getCanEditArticle } from '../../model/selectors/article';

import cls from './ArticlesDetailsPageHeader.module.scss';

interface ArticlesDetailsPageHeaderProps {
	className?: string
}

export const ArticlesDetailsPageHeader = memo((props: ArticlesDetailsPageHeaderProps) => {
	const {
		className,
	} = props;

	const navigate = useNavigate();
	const { t } = useTranslation();

	const canEdit = useSelector(getCanEditArticle);
	const article = useSelector(getArticleDetailsData);

	const onBackToList = useCallback(() => {
		navigate(getRouteArticles());
	}, [navigate]);

	const onEditArticle = useCallback(() => {
		if (article) {
			navigate(getRouteArticlesEdit(article.id));
		}
	}, [article, navigate]);

	return (
		<div className={classNames(cls.ArticlesDetailsPageHeader, {}, [className])}>
			<Button onClick={onBackToList}>{t('Назад к списку')}</Button>
			{canEdit && <Button className={cls.editBtn} onClick={onEditArticle}>{t('Редактировать')}</Button>}
		</div>
	);
});
