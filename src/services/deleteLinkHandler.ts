interface DeleteLinkHandlerProps {
    id: number;
    token: string;
}

async function deleteLinkHandler({ id, token }: DeleteLinkHandlerProps): Promise<boolean> {
    const api = process.env.REACT_APP_API_URL;
    let url = `${api}/card/link`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ Id: id }),
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

export default deleteLinkHandler;
