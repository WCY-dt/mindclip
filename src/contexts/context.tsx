import React, { createContext, useState, useEffect, useReducer } from 'react';
import { fetchCollection } from '../services/collectionFetcher';

export type NotificationState = {
  type: string;
  message: string;
};
export type NotificationAction = {
  type: 'SUCCESS' | 'ERROR';
  message: string;
};
const notificationReducer = (state: NotificationState, action: NotificationAction) => {
  switch (action.type) {
    case 'SUCCESS':
      return { ...state, type: 'SUCCESS', message: action.message };
    case 'ERROR':
      return { ...state, type: 'ERROR', message: action.message };
    default:
      return state;
  }
}

export const AppContext = createContext({
  isLoading: false,
  setLoading: (_: boolean) => {},
  showLogin: false,
  setShowLogin: (_: boolean) => {},
  isLogin: false,
  setLogin: (_: boolean) => {},
  showMobileMenu: false,
  setShowMobileMenu: (_: boolean) => {},
  needReload: false,
  setReload: (_: boolean) => {},
  routes: {},
	setRoutes: (_: {[_: string]: React.ReactNode}) => {},
  token: '',
  setToken: (_: string) => {},
  notification: { type: '', message: '' },
  dispatchNotification: (_: NotificationAction) => {},
	showConfirm: false,
	setShowConfirm: (_: boolean) => {},
	confirmMessage: '',
	setConfirmMessage: (_: string) => {},
	confirmAction: () => {},
	setConfirmAction: (_: () => void) => {},
  showEdit: false,
  setShowEdit: (_: boolean) => {},
  editContent: null as ClusterProps | null,
  setEditContent: (_: ClusterProps | null) => {},
  editType: 'new' as 'new' | 'modify',
  setEditType: (_: 'new' | 'modify') => {},
	selectedCategory: null as string | null,
	setSelectedCategory: (_: string | null) => {},
  searchTerm: '',
  setSearchTerm: (_: string) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setLoading] = useState<boolean>(true);
  const [showLogin, setShowLogin] = useState<boolean>(false);
	const [isLogin, setLogin] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
	const [needReload, setNeedReload] = useState<boolean>(false);
	const [routes, setRoutes] = useState({});
	const [token, setToken] = useState<string>('');
  const [notification, dispatchNotification] = useReducer(notificationReducer, { type: '', message: '' });
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [confirmMessage, setConfirmMessage] = useState<string>('');
	const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<ClusterProps | null>(null);
  const [editType, setEditType] = useState<'new' | 'modify'>('new');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setLoading(true);
		fetchCollection(setRoutes)
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setLogin(true);
			setToken(localStorage.getItem('token') as string);
		}
	}, []);

	useEffect(() => {
		localStorage.removeItem('colorMap');
	}, []);

	return (
		<AppContext.Provider value={{
			isLoading, setLoading,
      showLogin, setShowLogin,
			isLogin, setLogin,
      showMobileMenu, setShowMobileMenu,
			needReload, setReload: setNeedReload,
			routes, setRoutes,
			token, setToken,
      notification, dispatchNotification,
			showConfirm, setShowConfirm,
			confirmMessage, setConfirmMessage,
			confirmAction, setConfirmAction,
      showEdit, setShowEdit,
      editContent, setEditContent,
      editType, setEditType,
			selectedCategory, setSelectedCategory,
			searchTerm, setSearchTerm
		}}>
			{children}
		</AppContext.Provider>
	);
};
