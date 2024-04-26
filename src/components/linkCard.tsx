import React from 'react';
import '../styles/linkCard.css';

function isColorTooLight(color: string) {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  const y = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return y > 200;
}

function getBackgroundColor(category: string) {
  let colorMap = JSON.parse(localStorage.getItem('colorMap') ?? '{}') || {'default': '#d1ecf1'};
  
  if (!colorMap[category]) {
    let randomColor;
    do {
      randomColor = '#' + Math.floor(Math.random()*16000000).toString(16);
    } while (isColorTooLight(randomColor));
    colorMap[category] = randomColor;
    localStorage.setItem('colorMap', JSON.stringify(colorMap));
  }

  return colorMap[category] || colorMap['default'];
}

function getContrastColor(color: string) {
  const r = parseInt(color.substring(1, 2), 16);
  const g = parseInt(color.substring(3, 2), 16);
  const b = parseInt(color.substring(5, 2), 16);
  const y = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (y >= 100) ? 'black' : 'white';
}

interface LinkCardProps {
  item: {
    category: string;
    url: string;
    title: string;
    description: string;
    detail: string;
    links: { title: string, url: string }[];
  };
  setSelectedCategory: (value: string) => void;
}

function LinkCard({ item, setSelectedCategory }: LinkCardProps) {
  const backgroundColor = getBackgroundColor(item.category);
  const textColor = getContrastColor(backgroundColor);

  const handleCategoryClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setSelectedCategory(item.category);
};

  return (
    <a
      className="link-card"
      href={item.url ? item.url : '#'}
      target="_blank"
      rel="noopener noreferrer"
      id={item.title}
    >
      <div className="link-card-left">
        <div className="link-card-category" style={{ backgroundColor, color: textColor }} onClick={handleCategoryClick}>
          {item.category ? item.category : 'UNKNOWN'}
        </div>
        <div className="link-card-icon">
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain=${item.url ? new URL(item.url).hostname : 'ch3nyang.top'}`}
            alt="favicon"
            className="link-card-icon-img"
          />
        </div>
      </div>
      
      <div className="link-card-right">
        <div className="link-card-title">
          {item.title}
        </div>
        <div className="link-card-description">
          {item.description}
        </div>
        {item.detail ? (
          <div className="link-card-detail">
            {item.detail}
          </div>
        ) : null}
        {item.links ? (
          <div className="link-card-link">
            {item.links && item.links.length > 0 ? item.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card-link-item"
              >
                {link.title}
              </a>
            )) : ''}
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default LinkCard;