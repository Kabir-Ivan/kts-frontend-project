import { observer } from 'mobx-react-lite';
import React from 'react';

import InfiniteGrid from 'components/InfiniteGrid';
import Text from 'components/Text';
import RootStore from 'store/globals';
import { ProductsStore } from 'store/locals';
import { useLocalStore } from 'utils/useLocalStore';
import InputContainer from './components/InputContainer';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const productsLoader: ProductsStore = useLocalStore(() => new ProductsStore());

  const BATCH_SIZE = 24;

  const loadProducts = React.useCallback(
    (clear: boolean) => {
      productsLoader.getProductsList({
        substring: RootStore.query.getParam('substring')?.toString() || '',
        categories: (RootStore.query.getParam('include') || '')
          ?.toString()
          .split('|')
          .filter((v) => v && v != ' ')
          .map((v) => Number(v)),
        batchSize: BATCH_SIZE,
        clear: clear,
      });
    },
    [productsLoader],
  );

  React.useEffect(() => {
    if (productsLoader.list && productsLoader.list.length === 0) {
      loadProducts(true);
    }
  }, [productsLoader.list, loadProducts]);

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
        Total products: {productsLoader.isLoaded ? productsLoader.total : `Loading...`}
      </Text>
      <InfiniteGrid products={productsLoader.list} loadMore={loadMore} hasMore={productsLoader.hasMore} />
    </div>
  );
};

export default observer(Main);
