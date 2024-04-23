import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cluster from './js/clusters';
import './css/App.css';
import './css/nav.css';
import './css/footer.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    localStorage.removeItem('colorMap');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClearFilter = () => {
    setSearchTerm('');
  };

  const routes = {
    "/tech": "techniques",
    "/opi": "opinions",
    "/ins": "inspirations"
  };

  return (
    <Router>
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

      <div className="App">
        <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Cluster dataKey="techniques" searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />} />
            {Object.entries(routes).map(([path, element]) => (
              <Route path={path} element={<Cluster dataKey={element} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            ))}
          </Routes>
        </header>
      </div>

      <footer className="App-footer">
        <p className="App-footer-text">Copyright©2024 <a href="https://ch3nyang.top/">ch3nyang</a>. All rights reserved.</p>
        <p className="App-footer-text">Open source on <a href="https://github.com/WCY-dt/mindclip">GitHub</a>.</p>
      </footer>
    </Router>
  );
}

export default App;
