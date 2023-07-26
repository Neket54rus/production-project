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

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticlesDetails = (id: string) => `/articles/${id}`;
export const getRouteArticlesCreate = () => '/articles/new';
export const getRouteArticlesEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => '/admin-panel';
export const getRouteForbidden = () => '/forbidden';
