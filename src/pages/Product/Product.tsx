import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Loader from 'components/Loader';
import LoadingBlock from 'components/LoadingBlock';
import Text from 'components/Text';
import ArrowIcon from 'components/icons/ArrowIcon';
import config from 'config/config';
import useCategoriesStore from 'store/CategoriesStore/useCategoriesStore';
import useProductsStore from 'store/ProductsStore/useProductsStore';
import useSingleProductStore from 'store/SingleProductStore/useSingleProductStore';
import { ProductModel } from 'store/models/ProductModel';
import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { product, fetchSingleProduct } = useSingleProductStore();
  const { categories, fetchCategories } = useCategoriesStore();
  const { products, total, fetchProducts } = useProductsStore();
  const BATCH_SIZE = 6;

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const load = async () => {
    fetchProducts({
      substring: '',
      categories: categories
        .asList()
        .filter((c) => c.name == product?.category)
        .map((c) => c.id),
      batchSize: BATCH_SIZE,
      clear: false,
    });
  };

  const hasMore = () => {
    console.log(total, products.length);
    return products.length && total ? products.length < total : true;
  };

  React.useEffect(() => {
    fetchSingleProduct({
      id: Number(id),
    });
  }, [id]);

  React.useEffect(() => {
    if (product) {
      setIsLoaded(true);
    }
  }, [product]);

  const navigate = useNavigate();

  return (
    <div className={styles['product-container']}>
      <div className={styles['product__back-button-container']}>
        <div
          className={styles['product__back-button']}
          onClick={() => {
            navigate(config.PPODUCTS_LINK);
          }}
        >
          <ArrowIcon direction="left" />
          <div className={styles['product__back-button_text']}>Back</div>
        </div>
      </div>

      <div className={styles['product__product-card']}>
        <div className={styles['product__product-card_image-container']}>
          {isLoaded ? (
            <img src={product ? (product.images || [''])[0] : ''} className={styles['product__product-card_image']} />
          ) : (
            <LoadingBlock />
          )}
        </div>
        <div className={styles['product__product-card-info']}>
          <div className={styles['product__product-card-info_top']}>
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
          <div className={styles['product__product-card-info_bottom']}>
            {isLoaded ? (
              <Text view="title" weight="bold">
                ${product?.price}
              </Text>
            ) : (
              <LoadingBlock type="text" />
            )}
            {isLoaded ? (
              <div className={styles['product__button-container']}>
                <Button buttonType="primary">Buy now</Button>
                <Button buttonType="secondary">Add to cart</Button>
              </div>
            ) : (
              <LoadingBlock type="text" />
            )}
          </div>
        </div>
      </div>

      {isLoaded && (
        <div className={styles['product__related-container']}>
          <Text view="p-20" weight="bold">
            Related Items
          </Text>
          <InfiniteScroll
            className="fullwidth"
            dataLength={products.length}
            next={load}
            hasMore={hasMore()}
            loader={<Loader size="l" className={classNames('centered', styles['product__products-loader'])} />}
            endMessage={<div className={'horizontal-line'}></div>}
          >
            {
              <div className={styles['product__products-grid']}>
                {products.asList().map(
                  (product_: ProductModel) =>
                    product_.id != product?.id && (
                      <div className={styles['product__products-grid_grid-item']} key={product_.id}>
                        <Card
                          image={product_.images[0]}
                          title={product_.title}
                          subtitle={product_.description}
                          contentSlot={`$${product_.price}`}
                          captionSlot={product_.subtitle}
                          actionSlot={<Button onClick={() => alert(`Added ${product_.id}`)}>Add to cart</Button>}
                          onClick={() => {
                            navigate(`/product/${product_.id}`);
                          }}
                        />
                      </div>
                    ),
                )}
              </div>
            }
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default observer(Product);
