import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';

function Router() {
  const [searchTerm, setSearchTerm] = useState('');

  const routes = {
    "/tech": "techniques",
    "/opi": "opinions",
    "/ins": "inspirations"
  };

  return (
    <BrowserRouter>
      <Header routes={routes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Content routes={routes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Footer />
    </BrowserRouter>

  );
}

export default Router;