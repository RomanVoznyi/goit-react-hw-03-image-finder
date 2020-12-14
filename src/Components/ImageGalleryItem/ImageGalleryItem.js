import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, toggleModal }) => {
  const onClick = () => {
    toggleModal({
      status: true,
      src: image.largeImageURL,
      alt: image.tags,
    });
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={onClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
