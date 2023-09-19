import classNames from 'classnames';
import React from 'react';
import CheckIcon from '../icons/CheckIcon/CheckIcon';
import styles from './Checkbox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, className, disabled, ...otherProps }) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  const onClickFunction = () => {
    if (!disabled) {
      onChange(!isChecked);
      setIsChecked(!isChecked);
    }
  };
  return (
    <div
      className={classNames(styles['checkbox-container'], disabled && styles['checkbox-container_disabled'], className)}
      onClick={onClickFunction}
    >
      <input
        disabled={disabled}
        type="checkbox"
        checked={isChecked}
        className={styles['checkbox-container__input']}
        {...otherProps}
      />
      {isChecked && (
        <CheckIcon width={'40px'} height={'40px'} color="primary" className={styles['checkbox-container__checkmark']} />
      )}
    </div>
  );
};

export default CheckBox;
