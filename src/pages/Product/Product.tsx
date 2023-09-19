import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfiniteGrid from 'components/InfiniteGrid';
import Text from 'components/Text';
import ArrowIcon from 'components/icons/ArrowIcon';
import config from 'config/config';
import { SingleProductStore, CategoriesStore, ProductsStore } from 'store/locals';
import { useLocalStore } from 'utils/useLocalStore';
import ProductCard from './Components/ProductCard';
import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();
  const singleProductLoader: SingleProductStore = useLocalStore(() => new SingleProductStore());
  const categoriesLoader: CategoriesStore = useLocalStore(() => new CategoriesStore());
  const productsLoader: ProductsStore = useLocalStore(() => new ProductsStore());
  const BATCH_SIZE = 6;

  React.useEffect(() => {
    categoriesLoader.getCategoriesList();
  }, [categoriesLoader]);

  const load = React.useCallback(async () => {
    productsLoader.getProductsList({
      substring: '',
      categories: categoriesLoader.list
        .asList()
        .filter((c) => c.name == singleProductLoader.product?.category)
        .map((c) => c.id),
      batchSize: BATCH_SIZE,
      clear: false,
    });
  }, [categoriesLoader.list, productsLoader, singleProductLoader.product?.category]);

  React.useEffect(() => {
    singleProductLoader.getProduct({
      id: Number(id),
    });
  }, [id, singleProductLoader]);

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

      <ProductCard isLoaded={singleProductLoader.isLoaded} product={singleProductLoader.product} />

      {singleProductLoader.isLoaded && (
        <div className={styles['product__related-container']}>
          <Text view="p-20" weight="bold">
            Related Items
          </Text>
          <InfiniteGrid products={productsLoader.list} loadMore={load} hasMore={productsLoader.hasMore} />
        </div>
      )}
    </div>
  );
};

export default observer(Product);
