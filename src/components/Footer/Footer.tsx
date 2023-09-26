import React from 'react';
import Text from 'components/Text';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles['footer']}>
      <Text color="secondary">© Lalasia Systems 2023</Text>
    </div>
  );
};

export default React.memo(Footer);
