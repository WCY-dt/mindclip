import './css/App.css';
import './css/nav.css';
import Cluster from './js/clusters';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  localStorage.removeItem('colorMap');

  const routes = {
    "/tech": "techniques",
    "/opi": "opinions",
    "/ins": "inspirations"
  };

  return (
    <Router basename="/mindclip">
      <nav className="App-nav">
        <ul className="App-nav-list">
          {Object.entries(routes).map(([path, element]) => (
            <li className="App-nav-item"><Link to={path}>{element}</Link></li>
          ))}
        </ul>
      </nav>

      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Cluster dataKey="techniques" />} />
            {Object.entries(routes).map(([path, element]) => (
              <Route path={path} element={<Cluster dataKey={element} />} />
            ))}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
