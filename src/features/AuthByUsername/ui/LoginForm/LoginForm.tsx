import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string
	onSuccess: () => void
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
	const {
		className,
		onSuccess,
	} = props;

	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	const onChangeUsername = useCallback((value: string) => {
		dispatch(loginActions.setUsername(value));
	}, [dispatch]);

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value));
	}, [dispatch]);

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }));

		if (result.meta.requestStatus === 'rejected') {
			onSuccess();
		}
	}, [dispatch, password, username, onSuccess]);

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<div className={classNames(
				cls.LoginForm,
				{},
				[className],
			)}
			>
				<Text title={t('Форма авторизации')} />
				{error && <Text text={t('Не верные данные')} theme={TextTheme.ERROR} />}
				<Input
					className={cls.input}
					placeholder={t('Введите имя')}
					autofocus
					onChange={onChangeUsername}
					value={username}
				/>
				<Input
					className={cls.input}
					placeholder={t('Введите пароль')}
					onChange={onChangePassword}
					value={password}
				/>
				<Button
					className={cls.loginBtn}
					theme={ButtonTheme.OUTLINE}
					onClick={onLoginClick}
					disabled={isLoading}
				>
					{t('Войти')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
