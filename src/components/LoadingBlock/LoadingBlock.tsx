import classNames from 'classnames';
import React from 'react';
import styles from './LoadingBlock.module.scss';

export type LoadingBlockProps = {
    type?: 'image' | 'text'
}

const LoadingBlock: React.FC<LoadingBlockProps> = ({ type }) => {
    return (
        <div className={type == 'text' ? classNames(styles['loading-block-text'], styles['loading-block']) : styles['loading-block']}>
        </div>
    );
};

export default LoadingBlock;