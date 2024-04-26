import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cluster from '../components/clusters';
import '../styles/content.css';

interface ContentProps {
  routes: { [key: string]: string };
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

function Content({ routes, searchTerm, setSearchTerm }: ContentProps) {
  return (
    <div className="App-content">
      <Routes>
        <Route path="/"
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