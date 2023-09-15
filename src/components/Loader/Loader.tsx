import classNames from 'classnames';
import React from 'react';
import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  return (
    <div className={classNames(styles['loader'], styles['loader-' + size], className)}>
      <div
        className={classNames(
          styles['loader__wheel'],
          styles['loader__wheel-' + (['l', 'm', 's'].includes(size) ? size : 'l')],
          className,
        )}
      ></div>
    </div>
  );
};

export default Loader;
