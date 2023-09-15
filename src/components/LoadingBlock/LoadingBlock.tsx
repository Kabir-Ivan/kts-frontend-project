import classNames from 'classnames';
import React from 'react';
import styles from './LoadingBlock.module.scss';

export type LoadingBlockProps = {
  type?: 'image' | 'text';
};

const LoadingBlock: React.FC<LoadingBlockProps> = ({ type }) => {
  return <div className={classNames(styles['loading-block'], type == 'text' && styles['loading-block-text'])}></div>;
};

export default LoadingBlock;
