import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye-icon.svg';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Text } from '@/shared/ui/Text/Text';

import {
	Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
	className?: string
	article: Article
	view: ArticleView
	target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const {
		className,
		article,
		view,
		target,
	} = props;

	const { t } = useTranslation();

	const types = <Text className={cls.types} text={article.type.join(', ')} />;
	const views = (
		<>
			<Text className={cls.views} text={String(article.views)} />
			<Icon Svg={EyeIcon} />
		</>
	);

	if (view === ArticleView.BIG) {
		const textBlock = article.blocks.find(
			(block) => block.type === ArticleBlockType.TEXT,
		) as ArticleTextBlock;

		return (
			<div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
				<Card className={cls.card}>
					<div className={cls.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text className={cls.username} text={article.user.username} />
						<Text className={cls.date} text={article.createdAt} />
					</div>
					<Text className={cls.title} title={article.title} />
					{types}
					<img className={cls.img} src={article.img} alt={article.title} />
					{textBlock && (
						<ArticleTextBlockComponent className={cls.textBlock} block={textBlock} />
					)}
					<div className={cls.footer}>
						<AppLink to={RoutePath.articles_details + article.id}>
							<Button>
								{t('Читать далее...')}
							</Button>
						</AppLink>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<AppLink
			className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
			to={RoutePath.articles_details + article.id}
			target={target}
		>
			<Card className={cls.card}>
				<div className={cls.imageWrapper}>
					<img className={cls.img} src={article.img} alt={article.title} />
					<Text className={cls.date} text={article.createdAt} />
				</div>
				<div className={cls.infoWrapper}>
					{types}
					{views}
				</div>
				<Text className={cls.title} text={article.title} />
			</Card>
		</AppLink>
	);
});
