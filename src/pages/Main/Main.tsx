import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Text from 'components/Text';
import config from 'config/config';
import useCategoriesStore from 'store/CategoriesStore/useCategoriesStore';
import useProductsStore from 'store/ProductsStore/useProductsStore';
import RootStore from 'store/RootStore';
import { CategoryModel } from 'store/models/CategoryModel';
import { ProductModel } from 'store/models/ProductModel';
import styles from './Main.module.scss';

const Main = () => {
  const { categories, fetchCategories } = useCategoriesStore();
  const { products, total, fetchProducts } = useProductsStore();
  const [dropdownValue, setDropdownValue] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState(RootStore.query.getParam('substring')?.toString() || '');
  const [, setSearchParams] = useSearchParams();

  const BATCH_SIZE = 24;
  const navigate = useNavigate();
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
    fetchCategories();
  }, []);

  React.useEffect(() => {
    setDropdownValue(
      categories
        .asList()
        .map((category: CategoryModel) => {
          return { key: String(category.id), value: category.name };
        })
        .filter((option) => (RootStore.query.getParam('include') || '')?.toString().split('|').includes(option.key)),
    );
  }, [categories]);

  React.useEffect(() => {
    if (products && products.length === 0) {
      loadProducts(true);
    }
  }, [products]);

  const search = () => {
    const params: Record<string, string> = {
      include: dropdownValue.map((el) => el.key).join('|'),
      substring: inputValue,
    };
    setSearchParams({
      include: dropdownValue.map((el) => el.key).join('|'),
      substring: inputValue,
    });
    RootStore.query.setSearch(
      Object.keys(params)
        .map((k: string) => `${k}=${params[k]}`)
        .join(''),
    );
    loadProducts(true);
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
      <div className={styles['main__input-container']}>
        <div className={styles['main__text-input-container']}>
          <div className={styles['main__text-input-wrap']}>
            <Input
              value={inputValue}
              placeholder="Search product"
              onChange={(value) => {
                setInputValue(value);
              }}
            />
          </div>
          <Button onClick={search}>Find now</Button>
        </div>
        <MultiDropdown
          className={styles['main__categories-dropdown']}
          options={categories.asList().map((category: CategoryModel) => {
            return { key: String(category.id), value: category.name };
          })}
          value={dropdownValue}
          onChange={(value) => {
            setDropdownValue(value);
          }}
          getTitle={(options) =>
            options
              .sort()
              .map((opt) => opt.value)
              .join(', ')
          }
        />
      </div>
      <Text view="p-20" weight="bold" className={styles['total-text']}>
        Total products: {total == undefined ? `Loading...` : total}
      </Text>
      <InfiniteScroll
        className="fullwidth"
        dataLength={products.length}
        next={() => loadProducts(false)}
        hasMore={true}
        loader={<Loader size="l" className={classNames('centered', styles['main__products-loader'])} />}
        endMessage={<div className={'horizontal-line'}></div>}
      >
        {
          <div className={styles['main__products-grid']}>
            {products.asList().map(
              (product: ProductModel) =>
                product && (
                  <div className={styles['main__products-grid_grid-item']} key={product.id}>
                    <Card
                      image={product.images[0]}
                      title={product.title}
                      subtitle={product.description}
                      contentSlot={`$${product.price}`}
                      captionSlot={product.subtitle}
                      actionSlot={<Button onClick={() => alert(`Added ${product.id}`)}>Add to cart</Button>}
                      onClick={() => {
                        navigate(`${config.PRODUCT_LINK}/${product.id}`);
                      }}
                    />
                  </div>
                ),
            )}
          </div>
        }
      </InfiniteScroll>
    </div>
  );
};

export default observer(Main);
