import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-icon.svg';
import ArticlesIcon from '@/shared/assets/icons/articles-icon.svg';
import MainIcon from '@/shared/assets/icons/main-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
	getUserAuthData,
	(userData) => {
		const sidebarItemsList: SidebarItemType[] = [
			{ path: getRouteMain(), Icon: MainIcon, text: 'Главная' },
			{ path: getRouteAbout(), Icon: AboutIcon, text: 'О сайте' },
		];

		if (userData) {
			sidebarItemsList.push(
				{
					path: getRouteProfile(userData.id), Icon: ProfileIcon, text: 'Профиль', authOnly: true,
				},
				{
					path: getRouteArticles(), Icon: ArticlesIcon, text: 'Статьи', authOnly: true,
				},
			);
		}

		return sidebarItemsList;
	},
);
