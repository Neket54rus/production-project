import { FC, useEffect } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';

const reducers: ReducersList = {
	profile: profileReducer,
};

interface ProfilePageProps {
	className?: string
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
	const { className } = props;

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames('', {}, [className])}>
				<ProfileCard />
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
