interface LoginHandlerProps {
    username: string;
    password: string;
    setToken: (value: string) => void;
}

async function loginHandler({ username, password, setToken }: LoginHandlerProps): Promise<boolean> {
    const api = process.env.REACT_APP_API_URL;
    let url = `${api}/login`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({ user: username, pass: password }),
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        let token = data.token;
        setToken(token);
        // console.log('Token:', token);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export default loginHandler;