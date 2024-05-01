export function fetchCollection(setRoutes: (value: {}) => void) {
  return new Promise(async (resolve, reject) => {
    const api = process.env.REACT_APP_API_URL;
    let url = `${api}/card/collection`;

    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: string[] = await response.json();
      let routes: { [key: string]: string } = {};
      data.forEach((collection) => {
        routes[`/${collection.toLowerCase()}`] = collection;
      });
      setRoutes(routes);
      resolve(undefined);
    } catch (e) {
      console.error(`Fetch failed: ${(e as Error).message}`);
      console.error(`Failed URL: ${url}`);
      reject(e);
    }
  });
}