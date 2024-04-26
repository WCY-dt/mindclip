import React from 'react';
import '../styles/linkCard.css';

function isColorTooLight(color) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq > 200; // Change this value to adjust the lightness threshold
}

function getBackgroundColor(category) {
  let colorMap = JSON.parse(localStorage.getItem('colorMap')) || {'default': '#d1ecf1'};

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

function getContrastColor(color) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

function LinkCard({ item, setSelectedCategory }) {
  const backgroundColor = getBackgroundColor(item.category);
  const textColor = getContrastColor(backgroundColor);

  const handleCategoryClick = (e) => {
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