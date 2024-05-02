import React, { useState, useEffect, useContext } from 'react';

import { AppContext } from '../contexts/context';
import '../styles/popups/notification.css';

function Notification() {
	const {
		message, setMessage
	} = useContext(AppContext);

    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        if (message !== null) {
            setVisible(true);
            const visibilityTimer = setTimeout(() => {
                setVisible(false);
            }, 2000);
            const messageTimer = setTimeout(() => {
                setMessage(null);
            }, 4000);
            return () => {
                clearTimeout(visibilityTimer);
                clearTimeout(messageTimer);
            };
        }
        return;
    }, [message, setMessage]);

    return (
        <div className={`notification ${visible ? 'show' : ''}`}>
            {message}
        </div>
    );
}

export default Notification;
