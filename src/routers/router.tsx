import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppContext, AppProvider } from '../hooks/appContext';
import { NotificationProvider } from '../hooks/notificationContext';
import { ConfirmProvider } from '../hooks/confirmContext';
import { EditProvider } from '../hooks/editContext';
import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import Overlay from '../popups/overlay';
import ClearFilter from '../utils/clearFilter';

import '../styles/popups/loading.css';


function Router() {
  const { isLoading } = useContext(AppContext);

  if (isLoading) {
    return (
      <div className="loading"></div>
    );
  }

  return (
    <AppProvider>
      <NotificationProvider>
        <ConfirmProvider>
          <EditProvider>
            <BrowserRouter>
              <Header />
              <Content />
              <Footer />
            </BrowserRouter>
            <ClearFilter />
            <Overlay />
          </EditProvider>
        </ConfirmProvider>
      </NotificationProvider>
    </AppProvider>
  );
}

export default Router;
