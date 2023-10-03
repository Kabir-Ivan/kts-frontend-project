import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import Text from 'components/Text';
import config from 'config/config';
import RootStore from 'store/globals';
import { PasswordStrength, getPasswordStrength, validateEmail } from 'utils/validation';
import styles from './Signup.module.scss';

const Signup: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [passwordStrength, setPasswordStrength] = React.useState(PasswordStrength.Weak);

  const emailCheck = React.useCallback((value: string) => {
    setIsEmailValid(validateEmail(value));
    setEmail(value);
  }, []);

  const passwordCheck = React.useCallback((value: string) => {
    setPasswordStrength(getPasswordStrength(value));
    setPassword(value);
  }, []);

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the default form submission behavior

    RootStore.user.signup(
      {
        name: name,
        email: email,
        password: password,
      },
      () => {
        navigate(config.ENDPOINTS.PROFILE);
      },
    );
  };

  return (
    <div className={styles['signup']}>
      <form className={styles['signup__input-container']} onSubmit={handleSignup}>
        <Text view="title" weight="bold">
          Sign Up
        </Text>
        <Input type="text" placeholder="name" value="" onChange={setName} />
        <Input type="text" placeholder="email" value="" onChange={emailCheck} />
        {!isEmailValid && <ErrorMessage message={'Invalid email adress.'} />}
        <Input type="password" placeholder="password" value="" onChange={passwordCheck} />
        <Text>Password Strength: {passwordStrength}</Text>
        <div className={styles['signup__input-container_password-strength']}>
          <div
            className={classNames(
              styles['signup__input-container_password-strength_indicator'],
              styles[passwordStrength.toLowerCase()],
            )}
          ></div>
        </div>
        {<ErrorMessage message={RootStore.user.errorMessage || ''} />}
        <Button type="submit" disabled={passwordStrength == PasswordStrength.Weak || !isEmailValid}>
          Sign Up
        </Button>
        <Text view="p-14">
          Have an account? <Link to={config.ENDPOINTS.LOGIN}>Log In</Link>
        </Text>
      </form>
    </div>
  );
};

export default observer(Signup);
