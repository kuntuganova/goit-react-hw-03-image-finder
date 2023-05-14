import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ src, tags, dataSrc, onClick }) {
  return (
    <li className={css.imageGalleryItem} onClick={onClick}>
      <img
        src={src}
        alt={tags}
        data-src={dataSrc}
        className={css.imageGalleryItem_image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
