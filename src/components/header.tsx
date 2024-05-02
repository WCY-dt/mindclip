import React, { useState, useEffect, useRef, useContext } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import { AppContext } from '../contexts/context';
import Login from '../popups/login';

import '../styles/components/header.css';

function Header() {
	const {
		isLogedIn, setIsLogedIn,
		routes,
		setToken,
		setMessage,
		searchTerm, setSearchTerm,
    setShowOverlay,
    setOverlayAction
	} = useContext(AppContext);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClearFilter = () => {
    setSearchTerm('');
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [showLogin, setShowLogin] = useState(false);
  const toggleLogout = () => {
    setIsLogedIn(false);
    setToken('');
    localStorage.removeItem('token');
    setMessage('Successfully logged out');
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
          <div className={`App-nav-search ${isOpen ? 'open' : ''}`}>
            {searchTerm ? <Icon className="App-nav-search-icon" icon="ci:close-md" onClick={handleClearFilter} /> : <Icon className="App-nav-search-icon" icon="ci:filter-outline" />}
            <input
              ref={inputRef}
              className="App-nav-search-input"
              type="text"
              placeholder="Search something..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={`App-nav-login`} onClick={isLogedIn ? toggleLogout : () => {
            setShowLogin(true);
            setShowOverlay(true);
            setOverlayAction(() => () => setShowLogin(false));
          }} title="Login">{isLogedIn ? <Icon icon="ci:log-out" /> : <Icon icon="ci:user-01" />}</button>
        </div>
        <button className="App-nav-button" onClick={toggleMenu} title="Open/Close navigator">{isOpen ? <Icon icon="ci:window-close" /> : <Icon icon="ci:window-sidebar" />}</button>
        {isOpen && (
          <ul className="App-nav-menu">
            {Object.entries(routes).map(([path, element]) => (
							<li className="App-nav-item"><Link to={path}>{element as React.ReactNode}</Link></li>
            ))}
          </ul>
        )}
      </nav>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={() => {
        if (isOpen) toggleMenu();
      }}></div>
      {showLogin && <Login setShowLogin={setShowLogin} /> }
    </header>
  )
}

export default Header;
