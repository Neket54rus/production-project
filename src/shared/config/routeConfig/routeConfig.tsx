import { type RouteProps } from 'react-router-dom';

import { UserRole } from '@/entities/User/model/types/user';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesDetailsPage } from '@/pages/ArticlesDetailsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean
	role?: UserRole[]
}

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLES_DETAILS = 'articles_details',
	ARTICLES_CREATE = 'articles_create',
	ARTICLES_EDIT = 'articles_edit',
	ADMIN_PANEL = 'admin_panel',
	FORBIDDEN = 'forbidden',

	// last
	NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.PROFILE]: '/profile/', // + :id
	[AppRoutes.ARTICLES]: '/articles',
	[AppRoutes.ARTICLES_DETAILS]: '/articles/', // + :id
	[AppRoutes.ARTICLES_CREATE]: '/articles/new',
	[AppRoutes.ARTICLES_EDIT]: '/articles/:id/edit',
	[AppRoutes.ADMIN_PANEL]: '/admin-panel',
	[AppRoutes.FORBIDDEN]: '/forbidden',

	// last
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <AboutPage />,
	},
	[AppRoutes.PROFILE]: {
		path: `${RoutePath.profile}:id`,
		element: <ProfilePage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLES]: {
		path: RoutePath.articles,
		element: <ArticlesPage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLES_DETAILS]: {
		path: `${RoutePath.articles_details}:id`,
		element: <ArticlesDetailsPage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLES_EDIT]: {
		path: `${RoutePath.articles_edit}`,
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLES_CREATE]: {
		path: `${RoutePath.articles_create}`,
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRoutes.ADMIN_PANEL]: {
		path: `${RoutePath.admin_panel}`,
		element: <AdminPanelPage />,
		authOnly: true,
		role: [UserRole.ADMIN],
	},
	[AppRoutes.FORBIDDEN]: {
		path: `${RoutePath.forbidden}`,
		element: <ForbiddenPage />,
	},

	// last
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
