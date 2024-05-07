import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from '../hooks/appContext';
import LinkCard from '../components/linkCard';
import { fetchAndFilterData } from '../services/dataFetcher';

import './styles/clusters.css';
import '../styles/loading.css';

interface ClustersProps {
  dataKey: string;
}

function Clusters({ dataKey }: ClustersProps) {
	const {
		needReload, setReload: setNeedReload,
		selectedCategory,
		searchTerm
	} = useContext(AppContext);

  const [clusters, setClusters] = useState<ClusterProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAndFilterData(dataKey, false, selectedCategory, searchTerm, setClusters)
      .finally(() => {
				setIsLoading(false);
				if (needReload) {
					setNeedReload(false);
				}
			});
  }, [dataKey, selectedCategory, searchTerm, needReload, setNeedReload]);

  if (isLoading) {
    return (
      <div className="loading"></div>
    );
  }

  return (
    <>
      <h1 className="Clusters-title">{dataKey}</h1>
      <div className="Clusters-list">
        {clusters.length > 0 ? (
          clusters.map((cluster: ClusterProps) => (
            <LinkCard
              key={cluster.Id}
              item={cluster}
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
