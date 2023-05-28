import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ handleClickBtn, hidden }) {
  const buttonStyle = hidden ? { display: 'none' } : null;

  return (
    <button
      className={css.button}
      type="button"
      onClick={handleClickBtn}
      style={buttonStyle}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  handleClickBtn: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
};

Button.defaultProps = {
  hidden: false,
};

export default Button;
