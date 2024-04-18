import React, { useEffect, useState } from 'react';
import LinkCard from './linkCard';
import '../css/clusters.css';

function Clusters({ dataKey }) {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setClusters(data[dataKey]));
  }, [dataKey]);

  return (
    <>
      <h1 className="Clusters-title">{dataKey}</h1>
      <div className="Clusters-list">
        {clusters.length > 0 ? (
          clusters.map((cluster) => (
            <LinkCard
              key={cluster.title}
              item={cluster}
            />
          ))
        ) : (
          <p>Nothing here. Add one now!</p>
        )}
      </div>
    </>
  );
}

export default Clusters;