import { Icon } from '@iconify/react';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Login from '../popups/login';
import '../styles/header.css';

interface HeaderProps {
  routes: { [key: string]: string };
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isLogedIn: boolean;
  setIsLogedIn: (value: boolean) => void;
  token: string;
  setToken: (value: string) => void;
  message: string | null;
  setMessage: (value: string | null) => void;
}

function Header({ routes, searchTerm, setSearchTerm, isLogedIn, setIsLogedIn, token, setToken, message, setMessage }: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    localStorage.removeItem('colorMap');
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
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };
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
            <li className="App-nav-item"><Link to={path}>{element}</Link></li>
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
          <button className={`App-nav-login`} onClick={isLogedIn ? toggleLogout : toggleLogin} title="Login">{isLogedIn ? <Icon icon="ci:log-out" /> : <Icon icon="ci:user-01" />}</button>
        </div>
        <button className="App-nav-button" onClick={toggleMenu}>{isOpen ? <Icon icon="ci:window-close" /> : <Icon icon="ci:window-sidebar" />}</button>
        {isOpen && (
          <ul className="App-nav-menu">
            {Object.entries(routes).map(([path, element]) => (
              <li className="App-nav-item"><Link to={path}>{element}</Link></li>
            ))}
          </ul>
        )}
      </nav>
      <div className={`overlay ${(isOpen || showLogin) ? 'open' : ''}`} onClick={() => {
        if (isOpen) toggleMenu(); 
        if (showLogin) toggleLogin();
      }}></div>
      {showLogin && <Login setShowLogin={setShowLogin} setIsLogedIn={setIsLogedIn} token={token} setToken={setToken} message={message} setMessage={setMessage} /> }
    </header>
  )
}

export default Header;