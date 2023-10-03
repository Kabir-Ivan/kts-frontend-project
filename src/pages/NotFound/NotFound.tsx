import React from 'react';
import Text from 'components/Text';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles['not-found']}>
      <Text weight="bold" view="title">
        404 - Not Found
      </Text>

      <Text weight="bold" view="p-20">
        The page you are looking for does not exist.
      </Text>
    </div>
  );
};

export default NotFound;
