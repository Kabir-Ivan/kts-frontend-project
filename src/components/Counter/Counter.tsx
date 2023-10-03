import { observer } from 'mobx-react-lite';
import React from 'react';
import Text from 'components/Text';
import styles from './Counter.module.scss';

export type CounterProps = React.BaseHTMLAttributes<HTMLDivElement> & {
  value: number;
  onPlus: () => void;
  onMinus: () => void;
};

const Counter: React.FC<CounterProps> = ({ value, onPlus, onMinus }) => {
  return (
    <div className={styles['counter-container']}>
      <div className={styles['counter__button']} onClick={onMinus}>
        <Text view="p-20" weight="bold">
          -
        </Text>
      </div>
      <div className={styles['counter__text']}>
        <Text view="p-20" weight="bold">
          {value}
        </Text>
      </div>
      <div className={styles['counter__button']} onClick={onPlus}>
        <Text view="p-20" weight="bold">
          +
        </Text>
      </div>
    </div>
  );
};

export default observer(Counter);
