import React from 'react';
import SuccessAnimation from 'components/SuccessAnimation';
import Text from 'components/Text';
import styles from './Success.module.scss';

const SuccessPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles['success-page']}>
      <Text view="title" weight="bold">
        Success!
      </Text>
      <SuccessAnimation />
    </div>
  );
};

export default SuccessPage;
