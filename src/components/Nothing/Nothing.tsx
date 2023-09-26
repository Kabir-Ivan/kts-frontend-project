import React from 'react';
import Text from 'components/Text';
import styles from './Nothing.module.scss';

const Nothing: React.FC = () => {
  return (
    <div className={styles['nothing']}>
      <Text view="p-20" weight="bold">
        Nothing here
      </Text>
    </div>
  );
};

export default Nothing;
