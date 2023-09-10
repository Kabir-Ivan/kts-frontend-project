import * as React from 'react';
import { IconProps, ColorMapping } from '../Icon';

const ArrowLeftIcon: React.FC<IconProps> = (props) => {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={props.width || 32} height={props.height || 32} viewBox='0 0 32 32' fill='none'>
            <path d='M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44' stroke={props.color ? ColorMapping[props.color] : 'black'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

export default ArrowLeftIcon;

