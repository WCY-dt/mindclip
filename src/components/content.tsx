import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cluster from '../components/clusters';
import '../styles/content.css';

interface ContentProps {
  routes: { [key: string]: string };
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isLogedIn: boolean;
  token: string;
  setToken: (value: string) => void;
  message: string | null;
  setMessage: (value: string | null) => void;
}

function Content({ routes, searchTerm, setSearchTerm, isLogedIn, token, setToken, message, setMessage }: ContentProps) {
  return (
    <div className="App-content">
      <Routes>
        <Route path="/"
          element={<Cluster dataKey={routes[Object.keys(routes)[0]]} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLogedIn={isLogedIn} token={token} message={message} setMessage={setMessage} />}
        />
        {Object.entries(routes).map(([path, element]) => (
          <Route path={path}
            element={<Cluster dataKey={element} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLogedIn={isLogedIn} token={token} message={message} setMessage={setMessage} />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default Content;