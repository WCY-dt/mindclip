import React, { useContext } from 'react';
import { Icon } from '@iconify/react';


import { useNotification } from '../hooks/notificationContext';
import { useConfirm } from '../hooks/confirmContext';
import { useIsLogin } from '../hooks/loginContext';
import { useEdit } from '../hooks/editContext';
import { AppContext } from '../hooks/appContext';
import deleteCardHandler from '../services/deleteCardHandler';

import '../styles/components/editButton.css';

type EditButtonProps = {
  item: ClusterProps;
}

const EditButton = ({ item }: EditButtonProps) => {
  const {
    token
  } = useContext(AppContext);

  const setNotification = useNotification();
  const setConfirm = useConfirm();
  const [isLogin,] = useIsLogin();
  const setEdit = useEdit();

  const id = item.Id || 0;

  const onClickEdit = () => {
    setEdit({
      type: 'MODIFY',
      cluster: item
    });
  };

  const deleteCardAction = async (id: number) => {
    const deleteCardResult = await deleteCardHandler({ id, token });

    if (deleteCardResult === true) {
      setNotification({
        type: 'SUCCESS',
        message: 'Card delete'
      });
    } else {
      setNotification({
        type: 'ERROR',
        message: 'Card delete'
      });
    }
  };

  const onClickDelete = () => {
    setConfirm({
      message: 'Are you sure to delete this card?',
      confirmAction: () => deleteCardAction(id)
    });
  };

  return (
    <>
      {
        isLogin ? (
          <div className="link-card-edit" >
            <Icon
              icon="ci:edit-pencil-line-01"
              className="link-card-edit-edit"
              onClick={onClickEdit}>
            </Icon>
            <Icon
              icon="ci:trash-full"
              className="link-card-edit-delete"
              onClick={onClickDelete}>
            </Icon>
          </div >
        ) : null
      }
    </>
  );
}

export default EditButton;
