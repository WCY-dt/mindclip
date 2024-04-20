import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import LinkCard from './linkCard';
import '../css/clusters.css';

function Clusters({ dataKey, searchTerm, setSearchTerm }) {
  const [clusters, setClusters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        let filteredClusters = data[dataKey];
        if (selectedCategory) {
          filteredClusters = filteredClusters.filter(cluster => cluster.category === selectedCategory);
        }
        if (searchTerm) {
          filteredClusters = filteredClusters.filter(cluster =>
            Object.values(cluster).some(value =>
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
        setClusters(filteredClusters);
      });
  }, [dataKey, selectedCategory, searchTerm]);

  const handleClearFilter = () => {
    setSelectedCategory(null);
    setSearchTerm('');
  };

  return (
    <>
      <h1 className="Clusters-title">{dataKey}</h1>
      {(selectedCategory || searchTerm) && (
        <button className="Clusters-cancel-filter" onClick={handleClearFilter}><Icon icon="ci:filter-off-outline" /></button>
      )}
      <div className="Clusters-list">
        {clusters.length > 0 ? (
          clusters.map((cluster) => (
            <LinkCard
              key={cluster.title}
              item={cluster}
              setSelectedCategory={setSelectedCategory}
            />
          ))
        ) : (
          <p>{(selectedCategory || searchTerm) ? "No results." : "Nothing here. Add one now!"}</p>
        )}
      </div>
    </>
  );
}

export default Clusters;