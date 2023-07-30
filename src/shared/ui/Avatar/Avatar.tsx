import { CSSProperties, FC, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import AvatarIcon from '../../assets/icons/avatar-icon.svg';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';

import { Skeleton } from '../Skeleton';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string
	src?: string
	size?: number
	alt?: string
	fallbackInverted?: boolean
}

export const Avatar: FC<AvatarProps> = (props) => {
	const {
		className,
		src,
		size = 100,
		alt,
		fallbackInverted,
	} = props;

	const styles = useMemo<CSSProperties>(() => ({
		width: size,
		height: size,
	}), [size]);

	const fallback = <Skeleton width={size} height={size} border="50%" />;
	const errorFallback = <Icon inverted={fallbackInverted} Svg={AvatarIcon} height={size} width={size} />;

	return (
		<AppImage
			className={classNames(cls.Avatar, {}, [className])}
			src={src}
			alt={alt}
			style={styles}
			fallback={fallback}
			errorFallback={errorFallback}
		/>
	);
};
