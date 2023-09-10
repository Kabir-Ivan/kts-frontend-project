import * as React from 'react'
import { IconProps, ColorMapping } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill={"none"} {...props}>
                <path d="M4 11.6129L9.87755 18L20 7" stroke={ColorMapping[props.color || "primary"]} strokeWidth="2"/>
        </svg>
    );
}

export default CheckIcon;
