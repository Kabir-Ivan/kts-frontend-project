import classNames from 'classnames';
import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
    className?: string;
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    weight?: 'normal' | 'medium' | 'bold';
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'accent' | 'inherit';
    maxLines?: number;
};

const WeightMapping = {
    'normal': 400,
    'medium': 500,
    'bold': 700
}

const Text: React.FC<TextProps> = ({
    className,
    view,
    tag = 'div',
    weight = 'normal',
    children,
    color,
    maxLines,
}) => {
    const style: React.CSSProperties = {
        fontWeight: weight,
        WebkitLineClamp: maxLines,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    };

    // View mapping
    const viewStyles: Record<string, React.CSSProperties> = {
        title: {
            fontFamily: 'Roboto',
            fontSize: '44px',
            fontStyle: 'normal',
            fontWeight: WeightMapping[weight],
            lineHeight: '48px',
        },
        button: {
            fontFamily: 'Roboto',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: WeightMapping[weight],
            lineHeight: '18px',
            textTransform: 'uppercase',
        },
        'p-20': {
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: WeightMapping[weight],
            lineHeight: '24px',
        },
        'p-18': {
            fontFamily: 'Roboto',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: WeightMapping[weight],
            lineHeight: '22px',
        },
        'p-16': {
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: WeightMapping[weight],
            lineHeight: '20px',
        },
        'p-14': {
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: WeightMapping[weight],
            lineHeight: '18px',
        },
    };

    const mergedStyles = { ...style, ...viewStyles[view || ''] };

    return React.createElement(tag, { className: classNames(className, styles['text-color-' + (color || 'primary')]), style: mergedStyles }, children);
};

export default Text;
