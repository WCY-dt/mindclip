import React, { createContext, useState, useEffect } from 'react';
import { getCardCollectionHandler } from '../services/getCardCollectionHandler';

export const AppContext = createContext({
  isLoading: false,
  setLoading: (_: boolean) => {},
  showMobileMenu: false,
  setShowMobileMenu: (_: boolean) => {},
  needReload: false,
  setReload: (_: boolean) => {},
  routes: {},
	setRoutes: (_: {[_: string]: React.ReactNode}) => {},
  token: '',
  setToken: (_: string) => {},
	selectedCategory: null as string | null,
	setSelectedCategory: (_: string | null) => {},
  searchTerm: '',
  setSearchTerm: (_: string) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setLoading] = useState<boolean>(true);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
	const [needReload, setNeedReload] = useState<boolean>(false);
	const [routes, setRoutes] = useState({});
	const [token, setToken] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setLoading(true);
		getCardCollectionHandler(setRoutes)
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		sessionStorage.removeItem('colorMap');
	}, []);

	return (
		<AppContext.Provider value={{
			isLoading, setLoading,
      showMobileMenu, setShowMobileMenu,
			needReload, setReload: setNeedReload,
			routes, setRoutes,
			token, setToken,
			selectedCategory, setSelectedCategory,
			searchTerm, setSearchTerm
		}}>
			{children}
		</AppContext.Provider>
	);
};
