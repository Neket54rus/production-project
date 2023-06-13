import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { Input } from 'shared/ui/Input/Input';

function MainPage() {
	const { t } = useTranslation('main');

	const [value, setValue] = useState('');

	const onChange = (val: string) => {
		setValue(val);
	};

	return (
		<div>
			{t('Главная страница')}
		</div>
	);
}

export default MainPage;
