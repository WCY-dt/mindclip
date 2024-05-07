import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../hooks/appContext';
import EditButton from '../components/editButton';
import { getRandomColor, getContrastColor } from '../utils/randomColor';

import '../styles/components/linkCard.css';

type LinkCardProps = {
  item: ClusterProps;
}

function LinkCard({ item }: LinkCardProps) {
	const {
		setSelectedCategory
	} = useContext(AppContext);

  const backgroundColor = getRandomColor(item.Category);
  const textColor = getContrastColor(backgroundColor);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory(item.Category);
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
          <EditButton item={item} />
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
