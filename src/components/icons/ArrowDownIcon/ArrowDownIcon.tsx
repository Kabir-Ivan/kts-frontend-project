import * as React from 'react';
import { IconProps, ColorMapping } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill={ColorMapping[props.color || "primary"]} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" fill={ColorMapping[props.color || "primary"]}/>
        </svg>            
    );
}

export default ArrowDownIcon;

