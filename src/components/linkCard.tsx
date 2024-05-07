import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../contexts/context';
import { getRandomColor, getContrastColor } from '../utils/randomColor';
import deleteCardHandler from '../services/deleteCardHandler';

import '../styles/components/linkCard.css';

interface LinkCardProps {
  item: ClusterProps;
}

function LinkCard({ item }: LinkCardProps) {
	const {
		isLogin,
		token,
    dispatchNotification,
		setShowConfirm,
		setConfirmMessage,
		setConfirmAction,
		setSelectedCategory,
    setShowEdit,
    setEditContent,
    setEditType
	} = useContext(AppContext);

	const id = item.Id || 0;

  const backgroundColor = getRandomColor(item.Category);
  const textColor = getContrastColor(backgroundColor);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory(item.Category);
  };

  const onClickEdit = () => {
    setEditContent(item);
    setEditType('modify');
    setShowEdit(true);
  };

	const tryDeleteCard = async (id: number) => {
    const deleteCardResult = await deleteCardHandler({ id, token });

    if (deleteCardResult === true) {
      dispatchNotification({ type: 'SUCCESS', message: 'Card delete' });
    } else {
      dispatchNotification({ type: 'ERROR', message: 'Card delete' });
    }
  };

  const onClickDelete = () => {
    setConfirmMessage('Are you sure to delete this card?');
    setConfirmAction(() => () => {tryDeleteCard(id);});
    setShowConfirm(true);
  };

  return (
    <>
      <div className="link-card">
				<div id="link-card-id" hidden>{item.Id || 0}</div>
        <div className="link-card-left">
          <div className="link-card-info">
            <div className="link-card-category" style={{ backgroundColor, color: textColor }} onClick={handleCategoryClick}>
              {item.Category ?? 'UNKNOWN'}
            </div>
            <div className="link-card-icon">
              <img
                src={`https://www.google.com/s2/favicons?sz=64&domain=${item.Url ? new URL(item.Url).hostname : 'ch3nyang.top'}`}
                alt="favicon"
                className="link-card-icon-img"
              />
            </div>
          </div>
          {isLogin ? (
            <div className="link-card-edit">
              <Icon icon="ci:edit-pencil-line-01" className="link-card-edit-edit" onClick={onClickEdit}></Icon>
              <Icon icon="ci:trash-full" className="link-card-edit-delete" onClick={onClickDelete}></Icon>
            </div>
          ) : null
          }
        </div>

        <a
          className="link-card-right"
          href={item.Url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          id={uuidv4()}
          title="Click to open link"
        >
          <div className="link-card-title">
            {item.Title}
          </div>
          <div className="link-card-description">
            {item.Description}
          </div>
          {item.Detail ? (
            <div className="link-card-detail">
              {item.Detail}
            </div>
          ) : null}
          {(item.links?.length > 0) ? (
            <div className="link-card-link">
              {item.links.map((link) => (
                <a
                  key={link.Url}
                  href={link.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card-link-item"
                >
                  {link.Title}
                </a>
              ))}
            </div>
          ) : null}
        </a>
      </div>
    </>
  );
}

export default LinkCard;
