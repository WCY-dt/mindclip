import { Icon } from '@iconify/react';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

function Header({ routes, searchTerm, setSearchTerm }) {

  const inputRef = useRef();
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

  return (
    <header>
      <nav className="App-nav">
        <div className="App-nav-title">
          <img src="favicon.ico" alt="favicon" className="App-nav-title-icon" />
          <p className="App-nav-title-text">MindClip</p>
        </div>
        <ul className="App-nav-list">
          {Object.entries(routes).map(([path, element]) => (
            <li className="App-nav-item"><Link to={path}>{element}</Link></li>
          ))}
        </ul>
        <div className="App-nav-search">
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
      </nav>
      <nav className="App-nav-mobile">
        <div className="App-nav-title">
          <img src="favicon.ico" alt="favicon" className="App-nav-title-icon" />
          <p className="App-nav-title-text">MindClip</p>
        </div>
        <button className="App-nav-button" onClick={toggleMenu}>{isOpen ? <Icon icon="ci:window-close" /> : <Icon icon="ci:window-sidebar" />}</button>
        {isOpen && (
          <div className="App-nav-menu">
            <div className="App-nav-search">
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
            {Object.entries(routes).map(([path, element]) => (
              <li className="App-nav-item"><Link to={path}>{element}</Link></li>
            ))}
          </div>
        )}
      </nav>

      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </header>
  )
}

export default Header;