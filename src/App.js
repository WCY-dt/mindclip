import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cluster from './js/clusters';
import './css/App.css';
import './css/nav.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    localStorage.removeItem('colorMap');
  }, []);

  const routes = {
    "/tech": "techniques",
    "/opi": "opinions",
    "/ins": "inspirations"
  };

  return (
    <Router basename="/mindclip">
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
          <Icon className="App-nav-search-icon" icon="akar-icons:search" />
          <input 
            className="App-nav-search-input" 
            type="text" 
            placeholder="Search something..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Cluster dataKey="techniques" searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />} />
            {Object.entries(routes).map(([path, element]) => (
              <Route path={path} element={<Cluster dataKey={element} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            ))}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
