import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox } from '@/shared/ui/Popups';
import { Currency } from '../../model/types/currecy';

interface CurrencySelectProps {
    className?: string
	value?: Currency
	onChange?: (currecy: Currency) => void
	readonly?: boolean
}

const optionsList = [
	{ value: Currency.RUB, content: Currency.RUB },
	{ value: Currency.EUR, content: Currency.EUR },
	{ value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
	const {
		className,
		value,
		onChange,
		readonly,
	} = props;

	const { t } = useTranslation();

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Currency);
	}, [onChange]);

	return (
		<ListBox
			className={className}
			onChange={onChangeHandler}
			defaultValue={t('Укажите валюту')}
			label={t('Укажите валюту')}
			items={optionsList}
			value={value}
			readonly={readonly}
			direction="top right"
		/>
	);

	// return (
	// 	<Select
	// 		className={classNames('', {}, [className])}
	// 		label={t('Укажите валюту')}
	// 		options={optionsList}
	// 		value={value}
	// 		onChange={onChangeHandler}
	// 		readonly={readonly}
	// 	/>
	// );
});
