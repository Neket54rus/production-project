import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';

import { ArticleTextBlock } from '../../model/types/article';

import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
	className?: string
	block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
	const {
		className,
		block,
	} = props;

	return (
		<div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
			{block.title && <Text className={cls.title} title={block.title} />}
			{block.paragraphs.map((p) => <Text key={p} className={cls.paragraphs} text={p} />)}
		</div>
	);
});
