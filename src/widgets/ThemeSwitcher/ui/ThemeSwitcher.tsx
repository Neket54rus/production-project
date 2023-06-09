import { memo } from 'react';

import { Theme, useTheme } from 'app/providers/ThemeProvider';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonTheme } from 'shared/ui/Button';

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
	const { className } = props;

	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			className={classNames('', {}, [className])}
			onClick={toggleTheme}
			theme={ButtonTheme.CLEAR}
		>
			{theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
		</Button>
	);
});
