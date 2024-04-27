export interface ClusterProps {
  category: string;
  url: string;
  title: string;
  description: string;
  detail: string;
  links: { title: string, url: string }[];
}

export function fetchAndFilterData(
  dataKey: string,
  selectedCategory: string | null = null,
  searchTerm: string = '',
  setClusters: (value: ClusterProps[]) => void
) {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      let clusters = data[dataKey];
      if (selectedCategory) {
        clusters = clusters.filter((cluster: ClusterProps) => cluster.category === selectedCategory);
      }
      if (searchTerm) {
        clusters = clusters.filter((cluster: ClusterProps) =>
          Object.values(cluster).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      setClusters(clusters);
    });
}