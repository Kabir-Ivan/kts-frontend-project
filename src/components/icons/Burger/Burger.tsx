import * as React from 'react';
import { IconProps } from '../Icon';

const Burger: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 32}
      height={props.height || 32}
      viewBox="0 0 50 50"
      fill="none"
      {...props}
    >
      <path
        d="M 3 8 A 2.0002 2.0002 0 1 0 3 12 L 47 12 A 2.0002 2.0002 0 1 0 47 8 L 3 8 z M 3 23 A 2.0002 2.0002 0 1 0 3 27 L 47 27 A 2.0002 2.0002 0 1 0 47 23 L 3 23 z M 3 38 A 2.0002 2.0002 0 1 0 3 42 L 47 42 A 2.0002 2.0002 0 1 0 47 38 L 3 38 z"
        fill={'#151411'}
      ></path>
    </svg>
  );
};

export default React.memo(Burger);