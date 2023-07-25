import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text } from '@/shared/ui/Text';

interface RatingCardProps {
	className?: string
	title?: string
	feedbackTitle?: string
	hasFeedback?: boolean
	onCancel?: (starsCount: number) => void
	onAccept?: (starsCount: number, feedback?: string) => void
	rate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
	const {
		className,
		title,
		feedbackTitle,
		hasFeedback,
		onCancel,
		onAccept,
		rate = 0,
	} = props;

	const { t } = useTranslation();
	const [isModalOpen, setModalOpen] = useState(false);
	const [starsCount, setStarsCount] = useState(rate);
	const [feedback, setFeedback] = useState('');

	const onSelectStars = useCallback((selectedStarsCount: number) => {
		setStarsCount(selectedStarsCount);

		if (hasFeedback) {
			setModalOpen(true);
		} else {
			onAccept?.(selectedStarsCount);
		}
	}, [hasFeedback, onAccept]);

	const acceptHandler = useCallback(() => {
		setModalOpen(false);
		onAccept?.(starsCount, feedback);
	}, [feedback, onAccept, starsCount]);

	const cancelHandler = useCallback(() => {
		setModalOpen(false);
		onCancel?.(starsCount);
	}, [onCancel, starsCount]);

	const modalContent = (
		<>
			<Text title={feedbackTitle} />
			<Input placeholder={t('Ваш отзыв')} value={feedback} onChange={setFeedback} />
		</>
	);

	return (
		<Card className={classNames('', {}, [className])}>
			<VStack align="center" gap="8">
				<Text title={starsCount ? t('Спасибо за оценку!') : title} />
				<StarRating selectedStart={starsCount} size={40} onSelect={onSelectStars} />
			</VStack>
			<BrowserView>
				<Modal isOpen={isModalOpen} lazy>
					<VStack gap="32">
						{modalContent}
						<HStack justify="end" gap="16">
							<Button theme={ButtonTheme.OUTLINE_RED} onClick={cancelHandler}>
								{t('Закрыть')}
							</Button>
							<Button theme={ButtonTheme.OUTLINE} onClick={acceptHandler}>
								{t('Отправить')}
							</Button>
						</HStack>
					</VStack>
				</Modal>
			</BrowserView>
			<MobileView>
				<Drawer isOpen={isModalOpen} onClose={cancelHandler}>
					<VStack gap="32">
						{modalContent}
						<Button theme={ButtonTheme.OUTLINE_RED} onClick={cancelHandler} fullWidth>
							{t('Закрыть')}
						</Button>
						<Button theme={ButtonTheme.OUTLINE} onClick={acceptHandler} fullWidth>
							{t('Отправить')}
						</Button>
					</VStack>
				</Drawer>
			</MobileView>
		</Card>
	);
});
