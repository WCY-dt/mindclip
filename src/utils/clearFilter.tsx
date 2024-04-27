import React, { useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';

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

interface ClearFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

function ClearFilter({ selectedCategory, setSelectedCategory, searchTerm, setSearchTerm}: ClearFilterProps) {
    const clearFilter = useCallback(() => {
        setSelectedCategory(null);
        setSearchTerm('');
    }, [setSelectedCategory, setSearchTerm]);

    useKeyboardEvent('Escape', clearFilter);

    return (
      <>
        {(selectedCategory || searchTerm) && (
          <button className="Clusters-cancel-filter" onClick={clearFilter}><Icon icon="ci:filter-off-outline" /></button>
        )}
      </>
    );
}

export default ClearFilter;