import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppContext, AppProvider } from '../contexts/context';
import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import Notification from '../popups/notification';
import Confirm from '../popups/confirm';
import Edit from '../popups/edit';
import Overlay from '../popups/overlay';
import ClearFilter from '../utils/clearFilter';

import '../styles/popups/loading.css';


function Router() {
	const { isLoading: isLoading } = useContext(AppContext);

	if (isLoading) {
		return (
			<div className="loading"></div>
		);
	}

	return (
		<AppProvider>
				<BrowserRouter>
					<Header />
					<Content />
					<Footer />
				</BrowserRouter>
				<Notification />
				<ClearFilter />
				<Confirm />
        <Edit />
				<Overlay />
		</AppProvider>
	);
}

export default Router;
