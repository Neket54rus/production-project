import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';

import { ArticleType } from '../../model/types/article';

interface ArticleTypeTabsProps {
	className?: string
	value: ArticleType
	onChangeTab: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
	const {
		className,
		value,
		onChangeTab,
	} = props;

	const { t } = useTranslation();

	const typeTabs = useMemo<TabItem[]>(() => [
		{
			value: ArticleType.All,
			content: t('Все статьи'),
		},
		{
			value: ArticleType.IT,
			content: t('Айти'),
		},
		{
			value: ArticleType.ECONOMICS,
			content: t('Экономика'),
		},
		{
			value: ArticleType.SCIENCE,
			content: t('Наука'),
		},
	], [t]);

	const onTabClick = useCallback((tab: TabItem) => {
		onChangeTab(tab.value as ArticleType);
	}, [onChangeTab]);

	return (
		<Tabs
			className={classNames('', {}, [className])}
			tabs={typeTabs}
			value={value}
			onTabClick={onTabClick}
		/>
	);
});
