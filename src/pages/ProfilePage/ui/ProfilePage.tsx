import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import { EditableProfileCard } from '@/features/editableProfileCard';
import { VStack } from '@/shared/ui/Stack';

interface ProfilePageProps {
	className?: string
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
	const { className } = props;

	const { id } = useParams();

	return (
		<Page className={classNames('', {}, [className])}>
			<VStack gap="16">
				<EditableProfileCard id={id} />
			</VStack>
		</Page>
	);
};

export default ProfilePage;
