import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-icon.svg';
import ArticlesIcon from '@/shared/assets/icons/articles-icon.svg';
import MainIcon from '@/shared/assets/icons/main-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import { RoutePath } from '@/shared/const/router';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
	getUserAuthData,
	(userData) => {
		const sidebarItemsList: SidebarItemType[] = [
			{ path: RoutePath.main, Icon: MainIcon, text: 'Главная' },
			{ path: RoutePath.about, Icon: AboutIcon, text: 'О сайте' },
		];

		if (userData) {
			sidebarItemsList.push(
				{
					path: RoutePath.profile + userData.id, Icon: ProfileIcon, text: 'Профиль', authOnly: true,
				},
				{
					path: RoutePath.articles, Icon: ArticlesIcon, text: 'Статьи', authOnly: true,
				},
			);
		}

		return sidebarItemsList;
	},
);
