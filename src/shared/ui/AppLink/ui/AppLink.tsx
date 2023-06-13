import { memo, type FC } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

export const AppLink = memo((props: AppLinkProps) => {
	const {
		className,
		children,
		to,
		theme = AppLinkTheme.SECONDARY,
		...otherProps
	} = props;

	return (
		<Link
			className={classNames(cls.AppLink, {}, [className, cls[theme]])}
			to={to}
			{...otherProps}
		>
			{children}
		</Link>
	);
});
