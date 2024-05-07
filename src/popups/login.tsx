import React, { useContext } from 'react';
import { Icon } from '@iconify/react';

import { useNotification } from '../hooks/notificationContext';
import { AppContext } from '../hooks/appContext';
import loginHandler from '../services/loginHandler';

import '../styles/popups/popup.css';
import '../styles/popups/login.css';

function Login() {
  const {
    setShowLogin,
    setLogin,
    token, setToken
  } = useContext(AppContext);

  const setNotification = useNotification();

  const onClickLogin = async () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const loginResult = await loginHandler({ username, password, setToken });

    if (loginResult === true) {
      setShowLogin(false);
      sessionStorage.setItem('token', token);
      setLogin(true);
      setNotification({ type: 'SUCCESS', message: 'Login' });
    } else {
      setNotification({ type: 'ERROR', message: 'Login' });
    }
  };

  const onClickClose = () => {
    setShowLogin(false);
  }

  return (
    <>
      <div className="Popup">
        <div className="Login-title">Login</div>
        <div className="Login-input">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="button" className="Login-button" onClick={onClickLogin}>confirm</button>
        <button type="button" className="Login-close" title="Close" onClick={onClickClose}><Icon icon="ci:close-md" /></button>
      </div>
    </>
  );
}

export default Login;
