import React from 'react';
import Button from 'components/Button';
import LoadingBlock from 'components/LoadingBlock';
import Text from 'components/Text';
import { ProductModel } from 'store/models/ProductModel';
import styles from './ProductCard.module.scss';

export type ProductCardProps = {
  isLoaded: boolean;
  product: ProductModel | null;
};

const ProductCard: React.FC<ProductCardProps> = ({ isLoaded, product }) => {
  return (
    <div className={styles['product-card']}>
      <div className={styles['product-card__image-container']}>
        {isLoaded ? (
          <img src={product ? (product.images || [''])[0] : ''} className={styles['product-card__image']} />
        ) : (
          <LoadingBlock />
        )}
      </div>
      <div className={styles['product-card__info']}>
        <div className={styles['product-card__info_top']}>
          {isLoaded ? (
            <Text view="title" weight="bold">
              {product?.title}
            </Text>
          ) : (
            <LoadingBlock type="text" />
          )}
          {isLoaded ? (
            <Text view="p-20" color="secondary">
              {product?.subtitle}
            </Text>
          ) : (
            <LoadingBlock type="text" />
          )}
          {isLoaded ? (
            <Text view="p-20" color="secondary">
              {product?.description}
            </Text>
          ) : (
            <LoadingBlock type="text" />
          )}
        </div>
        <div className={styles['product-card__info_bottom']}>
          {isLoaded ? (
            <Text view="title" weight="bold">
              ${product?.price}
            </Text>
          ) : (
            <LoadingBlock type="text" />
          )}
          {isLoaded ? (
            <div className={styles['product-card__button-container']}>
              <Button buttonType="primary">Buy now</Button>
              <Button buttonType="secondary">Add to cart</Button>
            </div>
          ) : (
            <LoadingBlock type="text" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;