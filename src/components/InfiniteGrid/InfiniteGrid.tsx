import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'components/Loader';
import ProductCard from 'components/ProductCard';
import ProductModel from 'entities/product';
import Collection from 'entities/shared';
import styles from './InfiniteGrid.module.scss';

export type InfiniteGridProps = {
  products: Collection<number, ProductModel>;
  loadMore: () => void;
  hasMore: () => boolean;
};

const InfiniteGrid: React.FC<InfiniteGridProps> = ({ products, loadMore, hasMore }) => {
  return (
    <InfiniteScroll
      className="fullwidth"
      dataLength={products.length}
      next={loadMore}
      hasMore={hasMore()}
      loader={<Loader size="l" className={classNames('centered', styles['infinite-grid__products-loader'])} />}
      endMessage={<div className={'horizontal-line'}></div>}
    >
      {
        <div className={styles['infinite-grid__products-grid']}>
          {products.asList().map((product_: ProductModel) => (
            <div className={styles['infinite-grid__products-grid_grid-item']} key={product_.id}>
              <ProductCard product={product_} />
            </div>
          ))}
        </div>
      }
    </InfiniteScroll>
  );
};

export default observer(InfiniteGrid);
