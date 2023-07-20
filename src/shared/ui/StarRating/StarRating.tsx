import { memo, useState } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import StarRatingIcon from '../../assets/icons/star-rating-icon.svg';
import { Icon } from '../Icon/Icon';

import cls from './StarRating.module.scss';

interface StarRatingProps {
	className?: string
	onSelect?: (starsCount: number) => void
	size?: number
	selectedStart?: number
}

export const StarRating = memo((props: StarRatingProps) => {
	const {
		className,
		onSelect,
		size = 30,
		selectedStart = 0,
	} = props;

	const [currentStarsCount, setCurrentStarsCount] = useState(0);
	const [isSelected, setSelected] = useState(Boolean(selectedStart));

	const onHover = (starsCount: number) => () => {
		if (!isSelected) setCurrentStarsCount(starsCount);
	};

	const onLeave = () => {
		if (!isSelected) setCurrentStarsCount(0);
	};

	const onClick = (starsCount: number) => () => {
		if (!isSelected) {
			onSelect?.(starsCount);
			setCurrentStarsCount(starsCount);
			setSelected(true);
		}
	};

	const mods = (starIndex: number): Mods => ({
		[cls.hovered]: currentStarsCount >= starIndex,
		[cls.normal]: currentStarsCount < starIndex,
		[cls.selected]: isSelected,
	});

	return (
		<div className={classNames('', {}, [className])}>
			{[...Array(5)].map((_, index) => (
				<Icon
					className={classNames(cls.starIcon, mods(index + 1), [])}
					Svg={StarRatingIcon}
					key={`star-rating-key-${index}`}
					width={size}
					height={size}
					onMouseLeave={onLeave}
					onMouseEnter={onHover(index + 1)}
					onClick={onClick(index + 1)}
				/>
			))}
		</div>
	);
});
