import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import DateIcon from 'shared/assets/icons/date-icon.svg';
import { Icon } from 'shared/ui/Icon/Icon';

import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
	className?: string
	id: string
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const {
		className,
		id,
	} = props;

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const data = useSelector(getArticleDetailsData);
	const error = useSelector(getArticleDetailsError);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
		case ArticleBlockType.CODE:
			return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />;
		case ArticleBlockType.IMAGE:
			return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block} />;
		case ArticleBlockType.TEXT:
			return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
		default:
			return null;
		}
	}, []);

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	let content;

	if (isLoading) {
		content = (
			<>
				<Skeleton className={cls.avatar} width={200} height={200} border="50%" />
				<Skeleton className={cls.title} width={300} height={24} />
				<Skeleton className={cls.skeleton} width={600} height={24} />
				<Skeleton className={cls.skeleton} width="100%" height={200} />
				<Skeleton className={cls.skeleton} width="100%" height={200} />
			</>
		);
	} else if (error) {
		content = (
			<Text
				theme={TextTheme.ERROR}
				text={t('error')}
				align={TextAlign.CENTER}
			/>
		);
	} else {
		content = (
			<>
				<div className={cls.avatarWrapper}>
					<Avatar
						className={cls.avatar}
						size={200}
						src={data?.img}
					/>
				</div>
				<Text
					className={cls.title}
					title={data?.title}
					text={data?.subtitle}
					size={TextSize.L}
				/>
				<div className={cls.articleInfo}>
					<Icon className={cls.icon} Svg={EyeIcon} />
					<Text text={String(data?.views)} />
				</div>
				<div className={cls.articleInfo}>
					<Icon className={cls.icon} Svg={DateIcon} />
					<Text text={data?.createdAt} />
				</div>
				{data?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(cls.ArticleDetails, {}, [className])}>
				{content}
			</div>
		</DynamicModuleLoader>
	);
});
