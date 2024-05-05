import React, { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';

import { AppContext, NotificationState } from '../contexts/context';
import '../styles/popups/notification.css';

function useNotificationMessage(notification: NotificationState) {
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  useEffect(() => {
    switch (notification.type) {
      case 'SUCCESS':
        setNotificationMessage(notification.message + ' successfully');
        break;
      case 'ERROR':
        setNotificationMessage(notification.message + ' failed, please try again');
        break;
      default:
        setNotificationMessage(null);
    }
  }, [notification]);

  return [notificationMessage, setNotificationMessage] as const;
}

function useNotificationVisibility(notificationMessage: string | null, setNotificationMessage: Dispatch<SetStateAction<string | null>>) {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    if (notificationMessage) {
      setShowNotification(true);

      const visibilityTimer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      const messageTimer = setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);

      return () => {
        clearTimeout(visibilityTimer);
        clearTimeout(messageTimer);
      };
    }
    return;
  }, [notificationMessage, setNotificationMessage]);

  return showNotification;
}

function Notification() {
  const { notification } = useContext(AppContext);

  const [notificationMessage, setNotificationMessage] = useNotificationMessage(notification);
  const showNotification = useNotificationVisibility(notificationMessage, setNotificationMessage);

  return (
    <div className={`notification ${showNotification ? 'show' : ''}`}>
      {notificationMessage}
    </div>
  );
}

export default Notification;
