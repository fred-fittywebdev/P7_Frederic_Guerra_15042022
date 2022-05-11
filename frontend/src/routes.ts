import { ReactComponentElement } from 'react';
import { MdHome, MdSchedule } from 'react-icons/md';
import { Home, Login, Profil, UserList } from './pages';

export enum RoutePath {
	LOGIN = '/',
	ACCEUIL = '/home',
	PROFIL = '/profil',
	MEMBRES = '/user-list',
	DASHBOARD = '/dashboard',
	STAFF = '/roles',
	UTILISATEUR = '/users',
	SIGNALEMENT = '/warnings',
}

export const defaultSidebarNavItems: sideBarNavItems[] = [
	{
		name: 'Acceuil',
		path: RoutePath.ACCEUIL,
		icon: MdHome,
	},
	{
		name: 'Profil',
		path: RoutePath.PROFIL,
		icon: MdHome,
	},
	{
		name: 'Membres',
		path: RoutePath.MEMBRES,
		icon: MdHome,
	},
	{
		name: 'Staff',
		path: RoutePath.STAFF,
		icon: MdHome,
	},
];

export const staffSidebarNavItems: sideBarNavItems[] = [
	{
		name: 'Acceuil',
		path: RoutePath.ACCEUIL,
		icon: MdHome,
	},
	{
		name: 'Utilisateur',
		path: RoutePath.UTILISATEUR,
		icon: MdSchedule,
	},
	{
		name: 'Signalements',
		path: RoutePath.SIGNALEMENT,
		icon: MdSchedule,
	},
];

export const routes: Route[] = [
	{
		name: '/',
		path: RoutePath.LOGIN,
		component: Login,
	},
	{
		name: 'home',
		path: RoutePath.ACCEUIL,
		component: Home,
		sideBarNavItems: defaultSidebarNavItems,
	},
	{
		name: 'profil',
		path: RoutePath.PROFIL,
		component: Profil,
		sideBarNavItems: defaultSidebarNavItems,
	},
	{
		name: 'user-list',
		path: RoutePath.MEMBRES,
		component: UserList,
		sideBarNavItems: defaultSidebarNavItems,
	},

	//TODO: une fois les pages staff faites, venir ici pour les ajouter au tableau.
];

export interface sideBarNavItems {
	name: string;
	path: string;
	icon: React.ComponentType;
}

export interface Route {
	name: string;
	path: RoutePath;
	sideBarNavItems?: sideBarNavItems[];
	component: React.ComponentType;
}
