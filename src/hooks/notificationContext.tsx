import React, { createContext, useState, useReducer, useEffect, useContext } from 'react';

import '../styles/popups/notification.css';

type NotificationAction = {
  type: 'SUCCESS' | 'ERROR';
  message: string;
};

interface NotificationContextType {
  notification: NotificationAction;
  updateNotification: (action: NotificationAction) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const SUCCESS_MESSAGE_SUFFIX = ' successfully';
const ERROR_MESSAGE_SUFFIX = ' failed, please try again';

const notificationReducer = (state: NotificationAction, action: NotificationAction) => {
  switch (action.type) {
    case 'SUCCESS':
      return { ...action, message: action.message + SUCCESS_MESSAGE_SUFFIX }
    case 'ERROR':
      return { ...action, message: action.message + ERROR_MESSAGE_SUFFIX }
    default:
      return state;
  }
};

const VISIBILITY_DELAY = 2000;

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, dispatch] = useReducer(notificationReducer, { type: 'SUCCESS', message: '' });
  const [showNotification, setShowNotification] = useState(false);

  const updateNotification = (action: NotificationAction) => {
    dispatch(action);
  };

  useEffect(() => {
    let visibilityTimer: NodeJS.Timeout | null = null;

    if (notification.message) {
      setShowNotification(true);

      visibilityTimer = setTimeout(() => {
        setShowNotification(false);
      }, VISIBILITY_DELAY);
    }

    return () => {
      if (visibilityTimer) {
        clearTimeout(visibilityTimer);
      }
    };
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, updateNotification }}>
      {children}
      <div className={`notification ${showNotification ? 'show' : ''}`}>
        {notification.message}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context.updateNotification;
};
