import React from 'react';
import { Icon } from '@iconify/react';
import loginHandler from '../services/loginHandler';
import '../styles/popup.css';
import '../styles/login.css';

interface LoginProps {
  setShowLogin: (value: boolean) => void;
  setIsLogedIn: (value: boolean) => void;
  token: string;
  setToken: (value: string) => void;
  message: string | null;
  setMessage: (value: string | null) => void;
}

function Login({ setShowLogin, setIsLogedIn, token, setToken, message, setMessage }: LoginProps) {
  const tryLogin = async () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const loginResult = await loginHandler({ username, password, setToken });

    console.log(loginResult);

    if (loginResult === true) {
      setShowLogin(false);
      localStorage.setItem('token', token);
      setIsLogedIn(true);
      setMessage('Successfully logged in');
    } else {
      alert('Failed to login. Please try again.');
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
        <button type="button" className="Login-close" title="Close" onClick={() => setShowLogin(false)}>
          <Icon icon="ci:close-md" />
        </button>
      </div>
    </>
  );
}

export default Login;