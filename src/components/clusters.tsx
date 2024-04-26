import React, { useEffect, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import LinkCard from '../components/linkCard';
import { ClusterProps, fetchAndFilterData } from '../utils/dataFetcher';
import '../styles/clusters.css';

interface ClustersProps {
  dataKey: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

function Clusters({ dataKey, searchTerm, setSearchTerm }: ClustersProps) {
  const [clusters, setClusters] = useState<ClusterProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchAndFilterData(dataKey, selectedCategory, searchTerm, setClusters);
  }, [dataKey, selectedCategory, searchTerm]);

  const handleClearFilter = useCallback(() => {
    setSelectedCategory(null);
    setSearchTerm('');
  }, [setSelectedCategory, setSearchTerm]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        handleClearFilter();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClearFilter]);

  return (
    <>
      <h1 className="Clusters-title">{dataKey}</h1>
      {(selectedCategory || searchTerm) && (
        <button className="Clusters-cancel-filter" onClick={handleClearFilter}><Icon icon="ci:filter-off-outline" /></button>
      )}
      <div className="Clusters-list">
        {clusters.length > 0 ? (
          clusters.map((cluster: ClusterProps) => (
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