import classNames from 'classnames';
import React from 'react';
import styles from './Loader.module.scss';

export type LoaderProps = {
	/** Размер */
	size?: 's' | 'm' | 'l';
	/** Дополнительный класс */
	className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'm', className }) => {
	size = ['l', 'm', 's'].includes(size) ? size : 'l';
	console.log(size);
	return (
		<div className={classNames(styles['loader'], styles['loader-' + (['l', 'm', 's'].includes(size) ? size : 'l')], className)}>
			<div className={classNames(styles['loader-wheel'], styles['loader-wheel-' + (['l', 'm', 's'].includes(size) ? size : 'l')], className)}></div>
		</div>
	)
};

export default Loader;
