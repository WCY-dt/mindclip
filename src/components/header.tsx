import React, { useEffect, useRef, useContext } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import { AppContext } from '../contexts/context';
import Login from '../popups/login';

import '../styles/components/header.css';

function Header() {
  const {
    showLogin, setShowLogin,
    isLogin, setLogin,
    showMobileMenu, setShowMobileMenu,
    routes,
    setToken,
    dispatchNotification,
    searchTerm, setSearchTerm
  } = useContext(AppContext);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onClickClearFilter = () => {
    setSearchTerm('');
  };

  const onClickOpenMenu = () => {
    setShowMobileMenu(true);
  }

  const onClickCloseMenu = () => {
    setShowMobileMenu(false);
  }

  const onClickLogin = () => {
    setShowLogin(true);
  }

  const onClickLogout = () => {
    setLogin(false);
    setToken('');
    localStorage.removeItem('token');
    dispatchNotification({ type: 'SUCCESS', message: 'Logout' });
  };

  return (
    <header>
      <nav className="App-nav">
        <div className="App-nav-left">
          <a className="App-nav-title" href="/">
            <img src="favicon.ico" alt="favicon" className="App-nav-title-icon" />
            <p className="App-nav-title-text">MindClip</p>
          </a>
        </div>
        <ul className="App-nav-list">
          {Object.entries(routes).map(([path, element]) => (
            <li className="App-nav-item"><Link to={path}>{element as React.ReactNode}</Link></li>
          ))}
        </ul>
        <div className="App-nav-right">
          <div className={`App-nav-search ${showMobileMenu ? 'open' : ''}`}>
            {searchTerm ? <Icon className="App-nav-search-icon" icon="ci:close-md" onClick={onClickClearFilter} /> : <Icon className="App-nav-search-icon" icon="ci:filter-outline" />}
            <input
              ref={inputRef}
              className="App-nav-search-input"
              type="text"
              placeholder="Search something..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isLogin ?
            <button type="button" className="App-nav-login" onClick={onClickLogout} title="Log out"><Icon icon="ci:log-out" /></button> :
            <button type="button" className="App-nav-login" onClick={onClickLogin} title="Log in"><Icon icon="ci:user-01" /></button>
          }
        </div>
        {showMobileMenu ?
          <button className="App-nav-button" onClick={onClickCloseMenu} title="Close menu"><Icon icon="ci:window-close" /></button> :
          <button className="App-nav-button" onClick={onClickOpenMenu} title="Open menu"><Icon icon="ci:window-sidebar" /></button>
        }
        {showMobileMenu && (
          <ul className="App-nav-menu">
            {Object.entries(routes).map(([path, element]) => (
              <li className="App-nav-item"><Link to={path}>{element as React.ReactNode}</Link></li>
            ))}
          </ul>
        )}
      </nav>
      {showLogin && <Login />}
    </header>
  )
}

export default Header;
