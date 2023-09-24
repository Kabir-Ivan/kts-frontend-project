import { observer } from 'mobx-react-lite';
import React from 'react';

import InfiniteGrid from 'components/InfiniteGrid';
import Text from 'components/Text';
import config from 'config/config';
import RootStore from 'store/globals';
import { ProductsStore } from 'store/locals';
import { useLocalStore } from 'utils/useLocalStore';
import InputContainer from './components/InputContainer';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const productsStore: ProductsStore = useLocalStore(() => new ProductsStore());

  const loadProducts = React.useCallback(
    (clear: boolean) => {
      productsStore.getProductsList({
        substring: RootStore.query.getParam('substring')?.toString() || '',
        categories: (RootStore.query.getParam('include') || '')
          ?.toString()
          .split('|')
          .filter((v) => v && v != ' ')
          .map((v) => Number(v)),
        batchSize: config.BATCH_SIZE,
        clear: clear,
      });
    },
    [productsStore],
  );

  React.useEffect(() => {
    if (productsStore.list && productsStore.list.length === 0) {
      loadProducts(true);
    }
  }, [productsStore.list, loadProducts]);

  const loadMore = React.useCallback(() => {
    loadProducts(false);
  }, [loadProducts]);

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
        Total products: {productsStore.isLoaded ? productsStore.total : `Loading...`}
      </Text>
      <InfiniteGrid products={productsStore.list} loadMore={loadMore} hasMore={productsStore.hasMore} />
    </div>
  );
};

export default observer(Main);
