import React, { useEffect, useState } from 'react';
import LinkCard from './linkCard';

function Websites() {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setWebsites(data.websites));
  }, []);

  return (
    <div className="Websites-list">
      {websites.map((website) => (
        <LinkCard 
          key={website.url} 
          website={website} 
        />
      ))}
    </div>
  );
}

export default Websites;
