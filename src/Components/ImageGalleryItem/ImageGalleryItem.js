import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        data-imageurl={image.largeImageURL}
        className={s.image}
      />
    </li>
  );
};

export default ImageGalleryItem;
