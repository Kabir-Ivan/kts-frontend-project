import classNames from 'classnames';
import React from 'react';
import styles from './LoadingBlock.module.scss';

export type LoadingBlockProps = {
  type?: 'image' | 'text' | 'title' | 'price' | 'button';
};

const LoadingBlock: React.FC<LoadingBlockProps> = ({ type = 'image' }) => {
  return <div className={classNames(styles['loading-block'], styles[`loading-block-${type}`])}></div>;
};

export default LoadingBlock;
