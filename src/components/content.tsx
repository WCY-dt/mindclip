import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppContext } from '../contexts/context';
import Cluster from '../components/clusters';

import '../styles/components/content.css';

function Content() {
  const {
    routes
  } = useContext(AppContext);

  return (
    <div className="App-content">
      <Routes>
        <Route path="/"
          element={<Cluster dataKey={routes[Object.keys(routes)[0] as keyof typeof routes] as string} />}
        />
        {Object.entries(routes).map(([path, element]) => (
          <Route path={path}
            element={<Cluster dataKey={element as string} />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default Content;
