import { observer } from 'mobx-react-lite';
import React from 'react';
import Text from 'components/Text';
import styles from './ErrorMessage.module.scss';

export type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles['error']}>
      <Text color="inherit" view="p-14" weight="medium">
        {message}
      </Text>
    </div>
  );
};

export default observer(ErrorMessage);
