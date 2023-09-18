import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Text from 'components/Text';
import Logo from 'components/icons/Logo';

import config from 'config/config';
import styles from './Header.module.scss';

export type HeaderLink = {
  name: string;
  url: string;
};

export type HeaderOptions = {
  links: HeaderLink[];
  additonal?: React.ReactNode;
};

const Header: React.FC<HeaderOptions> = ({ links, additonal }) => {
  return (
    <div className={styles['header']}>
      <div className={styles['header__usable-area']}>
        <div className={styles['header__logo']}>
          <Link to={config.ENDPOINTS.PPODUCTS}>
            <Logo />
          </Link>
        </div>
        <div className={styles['header__links-container']}>
          <div className={styles['header__links']}>
            {links.map(({ name, url }) => (
              <div className={styles['header__link-container']} key={url}>
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    isActive ? styles['header__link'] + ' ' + styles['header__link-active'] : styles['header__link']
                  }
                  style={{ textDecoration: 'none' }}
                >
                  {({ isActive }) => (
                    <Text color="inherit" view="p-18" weight={isActive ? 'normal' : 'normal'}>
                      {name}
                    </Text>
                  )}
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {additonal && <div className={styles['header__additional']}>{additonal}</div>}
      </div>
    </div>
  );
};

export default observer(Header);
