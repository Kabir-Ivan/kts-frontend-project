import classNames from 'classnames';
import React from 'react';
import CheckIcon from '../icons/CheckIcon/CheckIcon';
import styles from './Checkbox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, className, disabled, ...otherProps }) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  return (
    <div className={classNames(styles['checkbox-container'], disabled && styles['checkbox-container-disabled'], className)}
      onClick={() => { if (!disabled) { onChange(!isChecked); setIsChecked(!isChecked) } }}>
      <input disabled={disabled} type='checkbox' checked={isChecked} {...otherProps} />
      {isChecked && <CheckIcon width={'40px'} height={'40px'} color='primary' className={styles['checkmark']} />}
    </div>

  );
};

export default CheckBox;
