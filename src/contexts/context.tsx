import React, { createContext, useState, useEffect } from 'react';
import { fetchCollection } from '../services/collectionFetcher';

export const AppContext = createContext({
  isLoading: false,
  setIsLoading: (_: boolean) => {},
  isLogedIn: false,
  setIsLogedIn: (_: boolean) => {},
  needReload: false,
  setNeedReload: (_: boolean) => {},
  routes: {},
	setRoutes: (_: {[_: string]: React.ReactNode}) => {},
  token: '',
  setToken: (_: string) => {},
  message: null as string | null,
  setMessage: (_: string | null) => {},
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
  showOverlay: false,
  setShowOverlay: (_: boolean) => {},
  overlayAction: () => {},
  setOverlayAction: (_: () => void) => {},
	selectedCategory: null as string | null,
	setSelectedCategory: (_: string | null) => {},
  searchTerm: '',
  setSearchTerm: (_: string) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
	const [needReload, setNeedReload] = useState<boolean>(false);
	const [routes, setRoutes] = useState({});
	const [token, setToken] = useState<string>('');
	const [message, setMessage] = useState<string | null>(null);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [confirmMessage, setConfirmMessage] = useState<string>('');
	const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<ClusterProps | null>(null);
  const [editType, setEditType] = useState<'new' | 'modify'>('new');
	const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [overlayAction, setOverlayAction] = useState<() => void>(() => () => {});
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setIsLoading(true);
		fetchCollection(setRoutes)
			.finally(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsLogedIn(true);
			setToken(localStorage.getItem('token') as string);
		}
	}, []);

	useEffect(() => {
		localStorage.removeItem('colorMap');
	}, []);

	return (
		<AppContext.Provider value={{
			isLoading, setIsLoading,
			isLogedIn, setIsLogedIn,
			needReload, setNeedReload,
			routes, setRoutes,
			token, setToken,
			message, setMessage,
			showConfirm, setShowConfirm,
			confirmMessage, setConfirmMessage,
			confirmAction, setConfirmAction,
      showEdit, setShowEdit,
      editContent, setEditContent,
      editType, setEditType,
			showOverlay, setShowOverlay,
      overlayAction, setOverlayAction,
			selectedCategory, setSelectedCategory,
			searchTerm, setSearchTerm
		}}>
			{children}
		</AppContext.Provider>
	);
};
