import React from 'react';
import { NavLink } from 'react-router-dom';
import Text from 'components/Text';
import styles from './Header.module.scss';
import Logo from 'components/icons/Logo';

export type HeaderLink = {
    name: string,
    url: string
}

export type HeaderOptions = {
    links: HeaderLink[],
    additonal?: React.ReactNode
}

const Header: React.FC<HeaderOptions> = ({ links, additonal }) => {
    return (
        <div className={styles['header']}>
            <div className={styles['header-usable-area']}>
                <div className={styles['header-logo']}>
                    <Logo />

                </div>
                <div className={styles['header-links-container']}>
                    <div className={styles['header-links']}>
                        {links.map(({ name, url }) => (
                            <div className={styles['header-link-container']} key={url}>
                                <NavLink to={url} className={({ isActive }) => isActive ? styles['header-link'] + ' ' + styles['header-link-active'] :
                                    styles['header-link']} style={{ textDecoration: 'none' }}>
                                    {({ isActive }) =>
                                        <Text color='inherit' view='p-18' weight={isActive ? 'normal' : 'normal'}>{name}</Text>
                                    }
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>

                {additonal && <div className={styles['header-additional']}>
                    {additonal}
                </div>}
            </div>
        </div>
    );
}

export default Header;