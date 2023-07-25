import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { Select, SelectOption } from '@/shared/ui/Select';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
	className?: string
	sort: ArticleSortField
	order: SortOrder
	onChangeOrder: (newOrder: SortOrder) => void
	onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
	const {
		className,
		sort,
		order,
		onChangeOrder,
		onChangeSort,
	} = props;

	const { t } = useTranslation();

	const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
		{
			value: 'asc',
			content: t('возрастанию'),
		},
		{
			value: 'desc',
			content: t('убыванию'),
		},
	], [t]);

	const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
		{
			value: ArticleSortField.CREATED,
			content: t('дате создания'),
		},
		{
			value: ArticleSortField.TITLE,
			content: t('названию'),
		},
		{
			value: ArticleSortField.VIEWS,
			content: t('просмотрам'),
		},
	], [t]);

	return (
		<div className={classNames(cls.ArticleSortSelector, {}, [className])}>
			<Select label={t('Сортировать ПО')} options={sortFieldOptions} value={sort} onChange={onChangeSort} />
			<Select
				className={cls.order}
				label={t('по')}
				options={orderOptions}
				value={order}
				onChange={onChangeOrder}
			/>
		</div>
	);
});
