import { useContext } from 'react';
import { AppContext } from "../hooks/appContext";
import { useNotification } from "../hooks/notificationContext";
import putCardHandler from "../services/putCardHandler";
import postCardHandler from "../services/postCardHandler";

export const useCardActions = () => {
  const { token, setReload } = useContext(AppContext);
  const setNotification = useNotification();

  const saveCardAction = async (cluster: ClusterProps, editType: string) => {
    let saveCardResult;
    if (editType === 'MODIFY') {
      saveCardResult = await putCardHandler({ cluster, token });
    } else if (editType === 'ADD') {
      saveCardResult = await postCardHandler({ cluster, token });
    }

    if (saveCardResult === true) {
      setNotification({
        type: 'SUCCESS',
        message: 'Card saved'
      });
      setReload(true);
    } else {
      setNotification({
        type: 'ERROR',
        message: 'Card saved'
      });
    }
  }

  return { saveCardAction };
}
