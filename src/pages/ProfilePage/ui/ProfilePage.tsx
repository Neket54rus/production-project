import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/editableProfileCard';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

interface ProfilePageProps {
	className?: string
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
	const { className } = props;

	const { id } = useParams();

	return (
		<Page className={className} data-testid="ProfilePage">
			<VStack gap="16">
				<EditableProfileCard id={id} />
			</VStack>
		</Page>
	);
};

export default ProfilePage;
