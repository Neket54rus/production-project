import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button';

import {
	// getAddCommentFormError,
	getAddCommentFormText,
} from '../model/selectors/addCommentFormSelectors';
import { addCommentFormActions, addCommentFormReducer } from '../model/slice/addCommentFormSlice';

import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
	className?: string
	onSendComment: (text: string) => void
}

const reducers: ReducersList = {
	addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
	const {
		className,
		onSendComment,
	} = props;

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const text = useSelector(getAddCommentFormText);
	// const error = useSelector(getAddCommentFormError);

	const onCommentTextChange = useCallback((value: string) => {
		dispatch(addCommentFormActions.setText(value));
	}, [dispatch]);

	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		onCommentTextChange('');
	}, [onCommentTextChange, onSendComment, text]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.AddCommentForm, {}, [className])}>
				<Input
					className={cls.input}
					placeholder={t('Введите текст комментария')}
					value={text}
					onChange={onCommentTextChange}
				/>
				<Button
					theme={ButtonTheme.OUTLINE}
					onClick={onSendHandler}
				>
					{t('Отправить')}

				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;
