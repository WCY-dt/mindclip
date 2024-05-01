import React, { useState, useEffect } from 'react';

import '../styles/popups/notification.css';

interface NotificationProps {
    message: string | null;
    setMessage: (value: string | null) => void;
}

function Notification({ message, setMessage }: NotificationProps) {
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
