import React, { useContext } from 'react';
import { Icon } from '@iconify/react';

import { AppContext } from '../contexts/context';
import loginHandler from '../services/loginHandler';

import '../styles/popups/popup.css';
import '../styles/popups/login.css';

interface LoginProps {
  setShowLogin: (value: boolean) => void;
}

function Login({ setShowLogin }: LoginProps) {
  const {
    setIsLogedIn,
    token, setToken,
    setMessage,
    setShowOverlay
  } = useContext(AppContext);

  const tryLogin = async () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const loginResult = await loginHandler({ username, password, setToken });

    if (loginResult === true) {
      setShowLogin(false);
      setShowOverlay(false);
      localStorage.setItem('token', token);
      setIsLogedIn(true);
      setMessage('Successfully logged in');
    } else {
      setMessage('Login failed. Please try again.');
    }
  };

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
        <button type="button" className="Login-button" onClick={tryLogin}>confirm</button>
        <button type="button" className="Login-close" title="Close" onClick={() => {
          setShowLogin(false);
          setShowOverlay(false);
        }}>
          <Icon icon="ci:close-md" />
        </button>
      </div>
    </>
  );
}

export default Login;
