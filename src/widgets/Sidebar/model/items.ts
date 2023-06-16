import { SVGProps, VFC } from 'react';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-icon.svg';
import AboutIcon from 'shared/assets/icons/about-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';
import ArticlesIcon from 'shared/assets/icons/articles-icon.svg';

export interface SidebarItemType {
	path: string
	text: string
	Icon: VFC<SVGProps<SVGSVGElement>>
	authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
	{ path: RoutePath.main, Icon: MainIcon, text: 'Главная' },
	{ path: RoutePath.about, Icon: AboutIcon, text: 'О сайте' },
	{
		path: RoutePath.profile, Icon: ProfileIcon, text: 'Профиль', authOnly: true,
	},
	{
		path: RoutePath.articles, Icon: ArticlesIcon, text: 'Статьи', authOnly: true,
	},
];
