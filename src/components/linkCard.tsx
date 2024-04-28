import React from 'react';
import { getRandomColor, getContrastColor } from '../utils/randomColor';
import '../styles/linkCard.css';

interface LinkCardProps {
  item: ClusterProps;
  setSelectedCategory: (value: string) => void;
}

function LinkCard({ item, setSelectedCategory }: LinkCardProps) {
  const backgroundColor = getRandomColor(item.Category);
  const textColor = getContrastColor(backgroundColor);

  const handleCategoryClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setSelectedCategory(item.Category);
};

  return (
    <a
      className="link-card"
      href={item.Urlpath ? item.Urlpath.replace(/&#39;/g, "'") : '#'}
      target="_blank"
      rel="noopener noreferrer"
      id={item.Title}
    >
      <div className="link-card-left">
        <div className="link-card-category" style={{ backgroundColor, color: textColor }} onClick={handleCategoryClick}>
          {item.Category ? item.Category.replace(/&#39;/g, "'") : 'UNKNOWN'}
        </div>
        <div className="link-card-icon">
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain=${item.Urlpath ? new URL(item.Urlpath.replace(/&#39;/g, "'")).hostname : 'ch3nyang.top'}`}
            alt="favicon"
            className="link-card-icon-img"
          />
        </div>
      </div>
      
      <div className="link-card-right">
        <div className="link-card-title">
          {item.Title.replace(/&#39;/g, "'")}
        </div>
        <div className="link-card-description">
          {item.Descr.replace(/&#39;/g, "'")}
        </div>
        {item.Detail ? (
          <div className="link-card-detail">
            {item.Detail.replace(/&#39;/g, "'")}
          </div>
        ) : null}
        {item.links ? (
          <div className="link-card-link">
            {item.links && item.links.length > 0 ? item.links.map((link) => (
              <a
                key={link.Urlpath}
                href={link.Urlpath.replace(/&#39;/g, "'")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card-link-item"
              >
                {link.Title.replace(/&#39;/g, "'")}
              </a>
            )) : ''}
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default LinkCard;