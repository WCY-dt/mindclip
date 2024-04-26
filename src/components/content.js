import { Route, Routes } from 'react-router-dom';
import Cluster from '../components/clusters';
import '../styles/content.css';

function Content({ routes, searchTerm, setSearchTerm }) {
  return (
    <div className="App-content">
      <Routes>
        <Route exact path="/"
          element={<Cluster dataKey="techniques" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
        />
        {Object.entries(routes).map(([path, element]) => (
          <Route path={path}
            element={<Cluster dataKey={element} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default Content;