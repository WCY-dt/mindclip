import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppContext, AppProvider } from '../hooks/appContext';
import { NotificationProvider } from '../hooks/notificationContext';
import { ConfirmProvider } from '../hooks/confirmContext';
import { LoginProvider } from '../hooks/loginContext';
import { EditProvider } from '../hooks/editContext';
import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import Overlay from '../components/overlay';
import ClearFilter from '../utils/clearFilter';

import '../styles/loading.css';


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
          <LoginProvider>
            <EditProvider>
              <BrowserRouter>
                <Header />
                <Content />
                <Footer />
              </BrowserRouter>
              <ClearFilter />
              <Overlay />
            </EditProvider>
          </LoginProvider>
        </ConfirmProvider>
      </NotificationProvider>
    </AppProvider>
  );
}

export default Router;
