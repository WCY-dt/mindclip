import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fetchCollection } from '../services/collectionFetcher';
import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import Notification from '../popups/notification';
import Overlay from '../popups/overlay';

import '../styles/popups/loading.css';

function Router() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);

	const [routes, setRoutes] = useState({});

  const [token, setToken] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
	const [showOverlay, setShowOverlay] = useState<boolean>(false)

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

  if (isLoading) {
    return (
      <div className="loading"></div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Header routes={routes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} token={token} setToken={setToken} message={message} setMessage={setMessage} setShowOverlay={setShowOverlay} />

				<Content routes={routes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLogedIn={isLogedIn} token={token} setToken={setToken} message={message} setMessage={setMessage} setShowOverlay={setShowOverlay} />

        <Footer />
      </BrowserRouter>
      <Notification message={message} setMessage={setMessage} />
			<Overlay showOverlay={showOverlay} setShowOverlay={setShowOverlay} />
    </>
  );
}

export default Router;
