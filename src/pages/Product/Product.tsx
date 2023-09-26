import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfiniteGrid from 'components/InfiniteGrid';
import Text from 'components/Text';
import ArrowIcon from 'components/icons/ArrowIcon';
import config from 'config/config';
import RootStore from 'store/globals';
import { SingleProductStore, ProductsStore } from 'store/locals';
import { useLocalStore } from 'utils/useLocalStore';
import ProductCard from './Components/ProductCard';
import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();
  const singleProductStore: SingleProductStore = useLocalStore(() => new SingleProductStore());
  const productsStore: ProductsStore = useLocalStore(() => new ProductsStore());

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const load = React.useCallback(async () => {
    productsStore.getProductsList({
      substring: '',
      categories: RootStore.categories.list
        .asList()
        .filter((c) => c.name == singleProductStore.product?.category)
        .map((c) => c.id),
      batchSize: config.BATCH_SIZE,
      clear: false,
    });
  }, [productsStore, singleProductStore.product?.category]);

  React.useEffect(() => {
    singleProductStore.getProduct({
      id: Number(id),
    });
  }, [id, singleProductStore]);

  const navigate = useNavigate();

  return (
    <div className={styles['product-container']}>
      <div className={styles['product__back-button-container']}>
        <div
          className={styles['product__back-button']}
          onClick={() => {
            navigate(config.ENDPOINTS.PPODUCTS);
          }}
        >
          <ArrowIcon direction="left" />
          <div className={styles['product__back-button_text']}>Back</div>
        </div>
      </div>

      <ProductCard isLoaded={singleProductStore.isLoaded} product={singleProductStore.product} />

      {singleProductStore.isLoaded && (
        <div className={styles['product__related-container']}>
          <Text view="p-20" weight="bold">
            Related Items
          </Text>
          <InfiniteGrid products={productsStore.list} loadMore={load} hasMore={productsStore.hasMore} />
        </div>
      )}
    </div>
  );
};

export default observer(Product);
