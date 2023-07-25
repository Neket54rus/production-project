import { FC, Suspense } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/Modal';
import { Spinner } from '@/shared/ui/Spinner';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = (props) => {
	const {
		className,
		isOpen,
		onClose,
	} = props;

	return (
		<Modal
			className={classNames(
				'',
				{},
				[className],
			)}
			isOpen={isOpen}
			onClose={onClose}
			lazy
		>
			<Suspense fallback={<Spinner />}>
				<LoginFormAsync onSuccess={onClose} />
			</Suspense>
		</Modal>
	);
};
