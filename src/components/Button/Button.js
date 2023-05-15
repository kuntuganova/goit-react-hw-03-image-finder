import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ handleClickBtn }) {
  return (
    <button className={css.button} type="button" onClick={handleClickBtn}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleClickBtn: PropTypes.func.isRequired,
};

export default Button;
