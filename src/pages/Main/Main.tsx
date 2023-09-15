import { observer } from 'mobx-react-lite';
import React from 'react';

import InfiniteGrid from 'components/InfiniteGrid';
import Text from 'components/Text';
import useProductsStore from 'store/ProductsStore/useProductsStore';
import RootStore from 'store/RootStore';
import InputContainer from './components/InputContainer';
import styles from './Main.module.scss';

const Main = () => {
  const { products, total, fetchProducts } = useProductsStore();

  const BATCH_SIZE = 24;
  const loadProducts = (clear: boolean) => {
    fetchProducts({
      substring: RootStore.query.getParam('substring')?.toString() || '',
      categories: (RootStore.query.getParam('include') || '')
        ?.toString()
        .split('|')
        .filter((v) => v && v != ' ')
        .map((v) => Number(v)),
      batchSize: BATCH_SIZE,
      clear: clear,
    });
  };

  React.useEffect(() => {
    if (products && products.length === 0) {
      loadProducts(true);
    }
  }, [products]);

  const hasMore = () => {
    return products.length != undefined && total != undefined ? products.length < total : true;
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['main__products-title-container']}>
        <Text color="primary" view="title" weight="bold">
          Products
        </Text>
        <Text color="secondary" view="p-20">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>
      <InputContainer loadProducts={loadProducts} />
      <Text view="p-20" weight="bold" className={styles['total-text']}>
        Total products: {total == undefined ? `Loading...` : total}
      </Text>
      <InfiniteGrid
        products={products}
        loadMore={() => {
          loadProducts(false);
        }}
        hasMore={hasMore}
      />
    </div>
  );
};

export default observer(Main);
