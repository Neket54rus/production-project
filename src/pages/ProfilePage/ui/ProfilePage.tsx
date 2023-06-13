import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'entities/Profile';

const reducers: ReducersList = {
	profile: profileReducer,
};

interface ProfilePageProps {
	className?: string
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
	const { className } = props;

	const { t } = useTranslation('profile');

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames('', {}, [className])}>
				{t('Страница профиля')}
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
