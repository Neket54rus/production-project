import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';

import { EditableProfileCard } from 'features/editableProfileCard';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { Text } from 'shared/ui/Text/Text';

interface ProfilePageProps {
	className?: string
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
	const { className } = props;

	const { id } = useParams();
	const { t } = useTranslation();

	if (!id) {
		return <Text text={t('Профиль не найден')} />;
	}

	return (
		<Page className={classNames('', {}, [className])}>
			<VStack gap="16">
				<EditableProfileCard id={id} />
			</VStack>
		</Page>
	);
};

export default ProfilePage;
