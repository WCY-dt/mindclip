import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fetchCollection } from '../services/collectionFetcher';
import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';

import '../styles/loading.css';

function Router() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [routes, setRoutes] = useState({});
  useEffect(() => {
    setIsLoading(true);
    fetchCollection(setRoutes)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="loading"></div>
    );
  }

  return (
    <BrowserRouter>
      <Header routes={routes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Content routes={routes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Footer />
    </BrowserRouter>

  );
}

export default Router;