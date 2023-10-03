import axios from 'axios';
import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import config from 'config/config';
import { PasswordStrength, getPasswordStrength } from 'utils/validation';
import styles from './Recover.module.scss';

const Forgot: React.FC = () => {
  const { id } = useParams();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [message, setMessage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordStrength, setPasswordStrength] = React.useState(PasswordStrength.Weak);

  const passwordCheck = React.useCallback((value: string) => {
    setPasswordStrength(getPasswordStrength(value));
    setPassword(value);
  }, []);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: config.API.RECOVER_URL,
      data: {
        id: id,
        password: password,
      },
    })
      .then(() => {
        setMessage('Success!');
        setDisabled(true);
      })
      .catch(() => {
        setMessage('Something went wrong.');
      });
  };

  return (
    <div className={styles['recover']}>
      <form className={styles['recover__input-container']} onSubmit={submit}>
        <Text view="title" weight="bold">
          Change password
        </Text>
        <Input type="password" placeholder="New password" value="" onChange={passwordCheck} disabled={disabled} />
        <Text>Password Strength: {passwordStrength}</Text>
        <div className={styles['recover__password-strength']}>
          <div
            className={classNames(
              styles['recover__password-strength_indicator'],
              styles[passwordStrength.toLowerCase()],
            )}
          ></div>
        </div>
        {<Text>{message}</Text>}
        <Button type="submit" disabled={passwordStrength == PasswordStrength.Weak || disabled}>
          Reset password
        </Button>
      </form>
    </div>
  );
};

export default Forgot;
