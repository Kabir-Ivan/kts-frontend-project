import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from 'components/Button';
import Counter from 'components/Counter';
import LoadingBlock from 'components/LoadingBlock';
import Text from 'components/Text';
import config from 'config/config';
import ProductModel from 'entities/product';
import RootStore from 'store/globals';
import styles from './ProductCard.module.scss';
import 'swiper/swiper-bundle.css';

export type ProductCardProps = {
  isLoaded: boolean;
  product: ProductModel | null;
};

const ProductCard: React.FC<ProductCardProps> = ({ isLoaded, product }) => {
  const navigate = useNavigate();

  const addCallback = React.useCallback(() => {
    if (product) {
      RootStore.cart.add(product.id);
      setIsButton(RootStore.cart.getAmount(product.id) < 1);
    }
  }, [product]);
  const removeCallback = React.useCallback(() => {
    if (product) {
      RootStore.cart.remove(product.id);
      setIsButton(RootStore.cart.getAmount(product.id) < 1);
    }
  }, [product]);
  const buyCallback = React.useCallback(() => {
    addCallback();
    navigate(config.ENDPOINTS.CART);
  }, [addCallback]);

  const [isButton, setIsButton] = React.useState(true);

  React.useEffect(() => {
    if (product) {
      setIsButton(RootStore.cart.getAmount(product.id) < 1);
    }
  }, [product]);

  return (
    <div className={styles['product-card']}>
      <div className={styles['product-card__image-container']}>
        {isLoaded && product ? (
          <>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation]}
            >
              {product.images.map((image, i) => (
                <SwiperSlide className={styles['product-card__image']} key={i}>
                  <img src={image} className={styles['product-card__image']} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <LoadingBlock />
        )}
      </div>
      <div className={styles['product-card__info']}>
        <div className={styles['product-card__info_top']}>
          {isLoaded ? (
            <>
              <Text view="title" weight="bold">
                {product?.title}
              </Text>
              <Text view="p-18" color="secondary">
                {product?.subtitle}
              </Text>
              <Text view="p-20" color="secondary">
                {product?.description}
              </Text>
            </>
          ) : (
            <>
              <LoadingBlock type="title" />
              <LoadingBlock type="text" />
              <LoadingBlock type="text" />
            </>
          )}
        </div>
        <div className={styles['product-card__info_bottom']}>
          {isLoaded ? (
            <>
              <Text view="title" weight="bold">
                ${product?.price}
              </Text>
              <div className={styles['product-card__button-container']}>
                {isButton ? (
                  <>
                    <Button onClick={buyCallback} buttonType="primary">
                      Buy now
                    </Button>
                    <Button onClick={addCallback} buttonType="secondary">
                      Add to cart
                    </Button>
                  </>
                ) : (
                  <Counter
                    value={product ? RootStore.cart.getAmount(product.id) : 0}
                    onPlus={addCallback}
                    onMinus={removeCallback}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <LoadingBlock type="price" />
              <div className={styles['product-card__button-container']}>
                <LoadingBlock type="button" />
                <LoadingBlock type="button" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(ProductCard);
