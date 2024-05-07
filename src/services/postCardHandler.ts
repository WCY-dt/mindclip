interface PostCardHandlerProps {
  cluster: ClusterProps;
  token: string;
}

async function postCardHandler({ cluster, token }: PostCardHandlerProps): Promise<boolean> {
  const api = process.env.REACT_APP_API_URL;
  let url = `${api}/card`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(cluster),
    });

    if (!response.ok) {
      return false;
    }

    await response.json();
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export default postCardHandler;
