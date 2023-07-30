import { ImgHTMLAttributes, ReactElement, memo, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string
	fallback?: ReactElement
	errorFallback?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
	const {
		className,
		src,
		alt = 'image',
		fallback,
		errorFallback,
		...otherProps
	} = props;

	const [isLoading, setLoading] = useState(true);
	const [hasError, setError] = useState(false);

	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		img.onload = () => {
			setLoading(false);
		};
		img.onerror = () => {
			setLoading(false);
			setError(true);
		};
	}, [src]);

	if (isLoading && fallback) {
		return fallback;
	}

	if (hasError && errorFallback) {
		return errorFallback;
	}

	return (
		<img className={className} src={src} alt={alt} {...otherProps} />
	);
});
