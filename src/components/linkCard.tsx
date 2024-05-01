import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { v4 as uuidv4 } from 'uuid';

import { getRandomColor, getContrastColor } from '../utils/randomColor';
import Confirm from '../popups/confirm';
import deleteCardHandler from '../services/deleteCardHandler';

import '../styles/components/linkCard.css';

interface LinkCardProps {
  item: ClusterProps;
  setSelectedCategory: (value: string) => void;
  isLogedIn: boolean;
  token: string;
  message: string | null;
  setMessage: (value: string | null) => void;
}

function LinkCard({ item, setSelectedCategory, isLogedIn, token, message, setMessage }: LinkCardProps) {
  const backgroundColor = getRandomColor(item.Category);
  const textColor = getContrastColor(backgroundColor);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory(item.Category);
  };

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const confirmMessage = "Are you confirmed to delete this card?";

  const tryDeleteCard = async () => {
    const id = item.Id || 0;
    const deleteCardResult = await deleteCardHandler({ id, token });

    if (deleteCardResult === true) {
      setMessage('Successfully deleted');
    } else {
      setMessage('Failed to delete. Please try again.');
    }
  };

  return (
    <>
      <div className="link-card">
        <div className="link-card-left">
          <div className="link-card-info">
            <div className="link-card-category" style={{ backgroundColor, color: textColor }} onClick={handleCategoryClick}>
              {item.Category ? item.Category : 'UNKNOWN'}
            </div>
            <div className="link-card-icon">
              <img
                src={`https://www.google.com/s2/favicons?sz=64&domain=${item.Url ? new URL(item.Url).hostname : 'ch3nyang.top'}`}
                alt="favicon"
                className="link-card-icon-img"
              />
            </div>
          </div>
          {isLogedIn ? (
            <div className="link-card-edit">
              <Icon icon="ci:edit-pencil-line-01" className="link-card-edit-edit"></Icon>
              <Icon icon="ci:trash-full" className="link-card-edit-delete" onClick={() => setShowConfirm(true)}></Icon>
            </div>
          ) : null
          }
        </div>

        <a
          className="link-card-right"
          href={item.Url ? item.Url : '#'}
          target="_blank"
          rel="noopener noreferrer"
          id={uuidv4()}
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
          {(item.links && item.links.length > 0) ? (
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
      {showConfirm ? (<Confirm message={confirmMessage} setShowConfirm={setShowConfirm} actionHandler={tryDeleteCard}/>) : null}
    </>
  );
}

export default LinkCard;
