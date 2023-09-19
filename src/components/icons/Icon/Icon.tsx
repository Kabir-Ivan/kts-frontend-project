import * as React from 'react';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};
const ColorMapping = {
  primary: styles['icon-primary'],
  accent: styles['icon-accent'],
  secondary: styles['icon-secondary'],
  black: styles['icon-black'],
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = () => null;

export { Icon, ColorMapping };
