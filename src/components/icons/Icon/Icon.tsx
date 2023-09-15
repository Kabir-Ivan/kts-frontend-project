import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};
const ColorMapping = {
    primary: "var(--text-primary)",
    accent: "var(--text-accent)",
    secondary: "var(--text-secondary)",
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = () => null

export {Icon, ColorMapping};
