import { useContext } from 'react';
import { AppContext } from "../hooks/appContext";
import { useNotification } from "../hooks/notificationContext";
import deleteLinkHandler from '../services/deleteLinkHandler';

export const useLinkActions = () => {
  const { token, setReload } = useContext(AppContext);
  const setNotification = useNotification();

  const deleteLinkAction = async (id: number) => {
    if (id === undefined) {
      return;
    }

    const deleteLinkResult = await deleteLinkHandler({ id, token });

    if (deleteLinkResult === true) {
      setNotification({
        type: 'SUCCESS',
        message: 'Link delete'
      });
      setReload(true);
    } else {
      setNotification({
        type: 'ERROR',
        message: 'Link delete'
      });
    }
  }

  return { deleteLinkAction };
}
