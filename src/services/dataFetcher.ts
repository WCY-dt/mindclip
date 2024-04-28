export function fetchAndFilterData(
  dataKey: string,
  isRandom: boolean = false,
  selectedCategory: string | null = null,
  searchTerm: string = '',
  setClusters: (value: ClusterProps[]) => void
) {
  const api = "https://api.mind.ch3nyang.top";
  let url = `${api}/linkcard?collection=${dataKey}`;
  if (selectedCategory) {
    url += `&category=${selectedCategory}`;
  }
  if (searchTerm) {
    url += `&search=${searchTerm}`;
  }

  fetch(url, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (isRandom) {
        data = data.sort(() => Math.random() - 0.5);
      }
      setClusters(data);
    })
    .catch(e => {
      console.error(`Fetch failed: ${e.message}`);
      console.error(`Failed URL: ${url}`);
    });
}