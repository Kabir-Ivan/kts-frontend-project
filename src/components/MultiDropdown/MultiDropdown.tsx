import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Input from '../Input/Input';
import Text from '../Text/Text';
import ArrowDownIcon from '../icons/ArrowDownIcon/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  ...otherProps
}) => {
  // eslint-disable-next-line prefer-const
  let [isOpened, setIsOpened] = React.useState(false);
  const [filterVal, setFilterVal] = React.useState('');
  const [currentValue, setCurrentValue] = React.useState(value);
  const [toRender, setToRender] = React.useState(
    options.map((opt) => {
      return { key: opt.key, value: opt.value, selected: value.map((v) => v.key).includes(opt.key) };
    }),
  );
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const iconRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) ||
        (iconRef.current && iconRef.current.contains(event.target as Node) && isOpened) ||
        disabled
      ) {
        isOpened = false;
        setIsOpened(false);
      } else {
        isOpened = true;
        setIsOpened(true);
      }
    },
    [disabled, isOpened],
  );

  const handleOptionClick = (index: number) => {
    const keys = currentValue.map((v) => v.key);
    if (keys.includes(options[index].key)) {
      onChange(currentValue.filter((v) => v.key != options[index].key));
      setCurrentValue(currentValue.filter((v) => v.key != options[index].key));
    } else {
      onChange([...currentValue, options[index]]);
      setCurrentValue([...currentValue, options[index]]);
    }
    setToRender(
      options.map((opt) => {
        return { key: opt.key, value: opt.value, selected: currentValue.map((v) => v.key).includes(opt.key) };
      }),
    );
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  React.useEffect(() => {
    setToRender(
      options.map((opt) => ({
        key: opt.key,
        value: opt.value,
        selected: currentValue.map((v) => v.key).includes(opt.key),
      })),
    );
  }, [options, currentValue]);

  return (
    <div ref={dropdownRef} className={classNames(className, styles['dropdown-container'])} {...otherProps}>
      <Input
        placeholder={getTitle(currentValue)}
        value={isOpened || !currentValue.length ? filterVal : getTitle(currentValue)}
        className={classNames(styles['dropdown__header'])}
        autoFocus={isOpened}
        afterSlot={
          <div ref={iconRef}>
            <ArrowDownIcon
              className={classNames(
                styles['dropdown__header_arrow'],
                isOpened && styles['dropdown__header_arrow_rotate'],
              )}
            />
          </div>
        }
        disabled={disabled}
        onChange={(val) => {
          setFilterVal(val);
        }}
      />
      {!disabled && (
        <div className={classNames(styles['dropdown__options'], isOpened && styles['dropdown__options_opened'])}>
          {toRender.map(
            (opt, index) =>
              (opt.value.toLowerCase().includes(filterVal.toLowerCase()) || opt.selected) && (
                <div
                  className={classNames(
                    styles['dropdown__option'],
                    opt.selected && styles['dropdown__option-selected'],
                  )}
                  onClick={() => {
                    handleOptionClick(index);
                  }}
                  key={opt.key}
                >
                  <Text color="inherit" view="p-16">
                    {opt.value}
                  </Text>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default observer(MultiDropdown);
