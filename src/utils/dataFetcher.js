export function fetchData(dataKey, setClusters) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => setClusters(data[dataKey]));
}


export function fetchAndFilterData(dataKey, selectedCategory, searchTerm, setClusters) {
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
}