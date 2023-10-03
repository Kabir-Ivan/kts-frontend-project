import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import Text from 'components/Text';
import config from 'config/config';
import RootStore from 'store/globals';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the default form submission behavior
    RootStore.user.login(
      {
        email: email,
        password: password,
      },
      () => {
        navigate(config.ENDPOINTS.PROFILE);
      },
    );
  };

  return (
    <div className={styles['login']}>
      <form className={styles['login__input-container']} onSubmit={handleLogin}>
        <Text view="title" weight="bold">
          Login
        </Text>
        <Input type="text" placeholder="email" value="" onChange={setEmail} />
        <Input type="password" placeholder="password" value="" onChange={setPassword} />
        {<ErrorMessage message={RootStore.user.errorMessage || ''} />}
        <Button type="submit">Login</Button>
        <Text view="p-14">
          New here? <Link to={config.ENDPOINTS.SIGNUP}>Sign Up</Link>
        </Text>
        <Text view="p-14">
          Forgot password? <Link to={config.ENDPOINTS.FORGOT}>Reset</Link>
        </Text>
      </form>
    </div>
  );
};

export default observer(Login);
