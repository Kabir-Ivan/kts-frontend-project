import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'subtitle' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'inherit';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag = 'div', weight = 'normal', children, color, maxLines }) => {
  const style: React.CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
  };
  return React.createElement(
    tag,
    {
      className: classNames(
        className,
        styles['text'],
        styles['text-color-' + (color || 'primary')],
        styles['text-weight-' + (weight || 'normal')],
        styles[view || 'p-20'],
      ),
      style: style,
    },
    children,
  );
};

export default observer(Text);
