import React from 'react';

function LinkCard({ website }) {
  return (
    <a
      className="Websites-link"
      href={website.url}
      target="_blank"
      rel="noopener noreferrer">
      {website.title}
    </a>
  );
}

export default LinkCard;