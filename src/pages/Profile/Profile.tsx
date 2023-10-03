import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import config from 'config/config';
import RootStore from 'store/globals';
import Order from './components/Order';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const logout = React.useCallback(() => {
    axios({
      method: 'post',
      url: config.API.LOGOUT_URL,
    })
      .then(() => {
        RootStore.user.getUser();
        navigate(config.ENDPOINTS.PPODUCTS);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {RootStore.user.isError && <Navigate to={config.ENDPOINTS.LOGIN} />}
      {RootStore.user.isLoggedIn && (
        <div className={styles['profile']}>
          <div className={styles['profile__usable-area']}>
            <Text view="title" weight="bold">
              Profile
            </Text>
            <div className={styles['profile__info']}>
              <Text view="subtitle" weight="bold">
                Info
              </Text>
              <Text view="p-20" weight="bold">
                Name: {RootStore.user.user ? RootStore.user.user.name : 'Loading...'}
              </Text>
              <Text view="p-20" weight="bold">
                Email: {RootStore.user.user ? RootStore.user.user.email : 'Loading...'}
              </Text>
              <Text view="p-20" weight="bold">
                Bonuses: {RootStore.user.user ? RootStore.user.user.bonuses : 'Loading...'}
              </Text>
              <div className={styles['profile__info_button-container']}>
                <Button onClick={logout}>Log Out</Button>
              </div>
            </div>

            <div className={styles['profile__info']}>
              <Text view="subtitle" weight="bold">
                Orders
              </Text>
              {RootStore.user.ordersList.map((order, i) => (
                <Order id={order.id} status={order.status} items={order.items} key={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Profile);
