import React, { useEffect, useState } from 'react';
import LinkCard from '../components/linkCard';
import ClearFilter from '../utils/clearFilter';
import { fetchAndFilterData } from '../services/dataFetcher';
import '../styles/clusters.css';
import '../styles/loading.css';

interface ClustersProps {
  dataKey: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

function Clusters({ dataKey, searchTerm, setSearchTerm }: ClustersProps) {
  const [clusters, setClusters] = useState<ClusterProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAndFilterData(dataKey, true, selectedCategory, searchTerm, setClusters)
      .finally(() => setIsLoading(false));
  }, [dataKey, selectedCategory, searchTerm]);

  if (isLoading) {
    return (
      <div className="loading"></div>
    );
  }

  return (
    <>
      <h1 className="Clusters-title">{dataKey}</h1>
      <ClearFilter {...{ selectedCategory, setSelectedCategory, searchTerm, setSearchTerm }} />
      <div className="Clusters-list">
        {clusters.length > 0 ? (
          clusters.map((cluster: ClusterProps) => (
            <LinkCard
              key={cluster.Title}
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