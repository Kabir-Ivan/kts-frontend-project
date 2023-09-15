import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Loader from 'components/Loader';
import { ProductModel } from 'store/models/ProductModel';
import Collection from 'store/models/shared/Collection';
import styles from './InfiniteGrid.module.scss';

export type InfiniteGridProps = {
  products: Collection<number, ProductModel>;
  loadMore: () => void;
  hasMore: () => boolean;
};

const InfiniteGrid: React.FC<InfiniteGridProps> = ({ products, loadMore, hasMore }) => {
  const navigate = useNavigate();

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
          ))}
        </div>
      }
    </InfiniteScroll>
  );
};

export default observer(InfiniteGrid);
