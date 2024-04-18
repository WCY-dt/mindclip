import './css/App.css';
import './css/nav.css';
import Cluster from './js/clusters';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  localStorage.removeItem('colorMap');

  const routes = {
    "/web": "websites",
    "/doc": "documents",
    "/ins": "inspirations"
  };

  return (
    <>
      <nav className="App-nav">
        <ul className="App-nav-list">
          {Object.entries(routes).map(([path, element]) => (
            <li className="App-nav-item"><a href={path}>{element}</a></li>
          ))}
        </ul>
      </nav>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route exact path="/" element={<Cluster dataKey="websites" />} />
              {Object.entries(routes).map(([path, element]) => (
                <Route path={path} element={<Cluster dataKey={element} />} />
              ))}
            </Routes>
          </header>
        </div>
      </Router>
    </>
  );
}

export default App;
