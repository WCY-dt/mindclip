import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { Icon } from '@iconify/react';

import { AppContext } from '../hooks/appContext';
import { useNotification } from '../hooks/notificationContext';
import loginHandler from '../services/loginHandler';

import './styles/popup.css';
import './styles/login.css';

type LoginContextType = {
  isLogin: boolean;
  setIsLogin: (login: boolean) => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    token, setToken
  } = useContext(AppContext);

  const setNotification = useNotification();

  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsLogin(true);
      setToken(sessionStorage.getItem('token') as string);
    }
  }, [setToken]);

  useEffect(() => {
    if (showLogin && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [showLogin]);

  const onClickLogin = async () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const loginResult = await loginHandler({ username, password, setToken });

    if (loginResult === true) {
      setShowLogin(false);
      sessionStorage.setItem('token', token);
      setIsLogin(true);
      setNotification({ type: 'SUCCESS', message: 'Login' });
    } else {
      setNotification({ type: 'ERROR', message: 'Login' });
    }
  }

  const onClickClose = () => {
    setShowLogin(false);
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClickLogin();
    }
  }

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, showLogin, setShowLogin }}>
      {children}
      {showLogin ?
        <div className="Popup">
          <div className="Login-title">Login</div>
          <div className="Login-input">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"
              onKeyDown={handleKeyPress} ref={usernameRef} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"
              onKeyDown={handleKeyPress} />
          </div>
          <button
            type="button"
            className="Login-button"
            onClick={onClickLogin}>
            confirm
          </button>
          <button
            type="button"
            className="Login-close"
            title="Close"
            onClick={onClickClose}>
            <Icon icon="ci:close-md" />
          </button>
        </div>
        : null}
    </LoginContext.Provider>
  );
};

export const useIsLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useIsLogin must be used within a LoginProvider');
  }
  return [context.isLogin, context.setIsLogin] as const;
}

export const useShowLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useShowLogin must be used within a LoginProvider');
  }
  return [context.showLogin, context.setShowLogin] as const;
};
