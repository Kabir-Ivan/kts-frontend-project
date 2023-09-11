import classNames from 'classnames';
import React from 'react';
import styles from './Input.module.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, className, value, onChange, afterSlot, ...otherProps }) => {
    const [currentValue, setCurrentValue] = React.useState(value);
    return (
      <div className={classNames(className, styles['input-container'], disabled && styles['input-container-disabled'])}>
        <input disabled={disabled} className={classNames(className, styles['text-input'])} value={currentValue}
          onChange={(e) => { onChange(e.target.value); setCurrentValue(e.target.value) }} {...otherProps} type='text' />
        {afterSlot}
      </div>
    );
  });

export default Input;