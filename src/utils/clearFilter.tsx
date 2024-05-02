import React, { useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';

import { AppContext } from '../contexts/context';

function useKeyboardEvent(key: string, callback: Function) {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === key) {
                callback();
            }
        };

        window.addEventListener('keydown', handler);

        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, [key, callback]);
}

function ClearFilter() {
		const {
				setSelectedCategory,
				setSearchTerm,
				selectedCategory,
				searchTerm
		} = useContext(AppContext);

    function clearFilter() {
        setSelectedCategory(null);
        setSearchTerm('');
    }

    useKeyboardEvent('Escape', clearFilter);

    return (
      <>
        {(selectedCategory || searchTerm) && (
          <button className="Clusters-cancel-filter" onClick={clearFilter}title="Clear filter" ><Icon icon="ci:filter-off-outline" /></button>
        )}
      </>
    );
}

export default ClearFilter;
