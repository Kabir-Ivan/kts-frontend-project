import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Loader from '../../components/Loader';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: 'primary' | 'secondary';
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;

  className?: string;

  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { buttonType, className, ...otherProps } = props;
  return (
    <button
      className={classNames(
        styles['button'],
        props.loading && styles['button--loading'],
        props.disabled && styles['button--disabled'],
        buttonType == 'secondary' && styles['button--secondary'],
        className,
      )}
      {...otherProps}
      disabled={props.disabled || props.loading}
    >
      {props.loading && <Loader size="s" className={styles['loader']} />}
      {props.children}
    </button>
  );
};

export default observer(Button);
