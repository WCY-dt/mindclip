export interface ClusterProps {
  category: string;
  url: string;
  title: string;
  description: string;
  detail: string;
  links: { title: string, url: string }[];
}

export function fetchData(
  dataKey: string,
  setClusters: (value: ClusterProps[]) => void
) {
  fetch('data.json')
    .then(response => response.json())
    .then(data => setClusters(data[dataKey]));
}


export function fetchAndFilterData(
  dataKey: string,
  selectedCategory: string | null,
  searchTerm: string,
  setClusters: (value: ClusterProps[]) => void
) {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      let filteredClusters = data[dataKey];
      if (selectedCategory) {
        filteredClusters = filteredClusters.filter((cluster: ClusterProps) => cluster.category === selectedCategory);
      }
      if (searchTerm) {
        filteredClusters = filteredClusters.filter((cluster: ClusterProps) =>
          Object.values(cluster).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      setClusters(filteredClusters);
    });
}