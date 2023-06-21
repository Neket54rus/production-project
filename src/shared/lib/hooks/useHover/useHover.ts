import { useCallback, useMemo, useState } from 'react';

interface UseHoverBind {
	onMouseEnter: () => void
	onMouseLeave: () => void
}

type UseHoverResult = [
	boolean,
	UseHoverBind
]

export const useHover = (): UseHoverResult => {
	const [isHover, setHover] = useState(false);

	const onMouseEnter = useCallback(() => {
		setHover(true);
	}, []);

	const onMouseLeave = useCallback(() => {
		setHover(false);
	}, []);

	return useMemo(() => [isHover, { onMouseEnter, onMouseLeave }], [isHover, onMouseEnter, onMouseLeave]);
};
