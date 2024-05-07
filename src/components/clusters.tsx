import React, { useEffect, useState, useContext } from 'react';
import { Icon } from '@iconify/react';

import { AppContext } from '../hooks/appContext';
import { useIsLogin } from '../hooks/loginContext';
import { useEdit } from '../hooks/editContext';
import LinkCard from '../components/linkCard';
import { getCardHandler } from '../services/getCardHandler';

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

  const [isLogin,] = useIsLogin();
  const setEdit = useEdit();

  const [clusters, setClusters] = useState<ClusterProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getCardHandler(dataKey, false, selectedCategory, searchTerm, setClusters)
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

  const onClickNew = () => {
    setEdit({
      type: 'ADD',
      cluster: {
        Id: undefined,
        Collection: dataKey,
        Title: '',
        Url: '',
        Category: '',
        Description: '',
        Detail: '',
        links: []
      }
    });
  };

  return (
    <>
      <div className="Clusters-title">
        <h1 className="Clusters-title-text">{dataKey}</h1>
        { isLogin ?
          <Icon icon="ci:add-to-queue" className="linkcard-add" onClick={onClickNew} />
          : null
        }
      </div>
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
