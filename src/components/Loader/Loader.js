import css from './Loader.module.css';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <TailSpin color="#3f51b5" height={150} width={150} ariaLabel="loading" />
    </div>
  );
};

export default Loader;
