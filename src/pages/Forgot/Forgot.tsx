import axios from 'axios';
import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import config from 'config/config';
import styles from './Forgot.module.scss';

const Forgot: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [message, setMessage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: config.API.FORGOT_URL,
      data: {
        email: email,
      },
    })
      .then(() => {
        setMessage("If the user with this email exists, we'll send a password recovery email to that address.");
        setDisabled(true);
      })
      .catch(() => {
        setMessage('Something went wrong.');
      });
  };

  return (
    <div className={styles['forgot']}>
      <form className={styles['forgot__input-container']} onSubmit={submit}>
        <Text view="title" weight="bold">
          Forgot Password
        </Text>
        <Input type="text" placeholder="email" value="" onChange={setEmail} disabled={disabled} />
        {<Text>{message}</Text>}
        <Button type="submit" disabled={disabled}>
          Send Recovery Email
        </Button>
      </form>
    </div>
  );
};

export default Forgot;
