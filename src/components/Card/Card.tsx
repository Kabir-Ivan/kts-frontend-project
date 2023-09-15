import classNames from 'classnames';
import React from 'react';
import Text from '../../components/Text';
import styles from './Card.module.scss';


export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot, ...otherProps }) => {
    const handleClick = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.action-slot') && onClick) {
            onClick(event);
        }
    }
    return (
        <div className={classNames(styles['card'], className)} onClick={handleClick} {...otherProps}>
            <img className={styles['card-header']} src={image} />
            <div className={styles['card-body']}>
                <div className={styles['card-text']}>
                    {captionSlot && captionSlot != '' && <Text color='secondary' view='p-14' className={styles['card-body-text']} weight='bold' maxLines={1}>{captionSlot}</Text>}
                    <Text color='primary' view='p-20' className={styles['card-body-text']} weight='bold' maxLines={2}>{title}</Text>
                    <Text color='secondary' view='p-16' className={styles['card-body-text']} maxLines={3}>{subtitle}</Text>
                </div>
                <div className={styles['card-footer']}>
                    {contentSlot && contentSlot != '' && <div className={styles['card-footer-text']}>
                        <div className={styles['card-body-text']}>
                            <Text color='primary' view='p-18' weight='bold' maxLines={2}>{contentSlot}</Text>
                        </div>
                    </div>}
                    <div className={'action-slot'}>
                        {actionSlot}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Card;
