import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange?: (value: string) => void;
  /** Callback, вызываемый при вводе данных в поле */
  formatter?: (value: string) => string;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    disabled,
    className,
    value,
    onChange = () => {},
    formatter = (value: string) => value,
    afterSlot,
    ...otherProps
  }) => {
    const [currentValue, setCurrentValue] = React.useState(formatter(value));
    React.useEffect(() => {
      setCurrentValue(formatter(value));
    }, [value]);
    return (
      <div className={classNames(className, styles['input-container'], disabled && styles['input-container_disabled'])}>
        <input
          disabled={disabled}
          className={classNames(className, styles['text-input'])}
          value={currentValue}
          onChange={(e) => {
            onChange(e.target.value);
            setCurrentValue(formatter(e.target.value));
          }}
          {...otherProps}
        />
        {afterSlot}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default observer(Input);
