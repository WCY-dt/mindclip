import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fetchCollection } from '../services/collectionFetcher';
import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import Notification from '../popups/notification';

import '../styles/loading.css';

function Router() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const [routes, setRoutes] = useState({});

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
        <Header routes={routes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} token={token} setToken={setToken} message={message} setMessage={setMessage} />

        <Content routes={routes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLogedIn={isLogedIn} token={token} setToken={setToken}/>

        <Footer />
      </BrowserRouter>
      <Notification message={message} setMessage={setMessage} />
    </>
  );
}

export default Router;