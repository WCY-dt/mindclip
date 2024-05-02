export function fetchAndFilterData(
  dataKey: string,
  isRandom: boolean = false,
  selectedCategory: string | null = null,
  searchTerm: string = '',
  setClusters: (value: ClusterProps[]) => void
) {
  return new Promise(async (resolve, reject) => {
    const api = process.env.REACT_APP_API_URL;
    let url = `${api}/card?showid&collection=${dataKey}`;
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }
    if (searchTerm) {
      url += `&query=${searchTerm}`;
    }

    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      if (isRandom) {
        data = data.sort(() => Math.random() - 0.5);
      }
      setClusters(data);
      resolve(undefined);
    } catch (e) {
      console.error(`Fetch failed: ${(e as Error).message}`);
      console.error(`Failed URL: ${url}`);
      reject(e);
    }
  });
}
