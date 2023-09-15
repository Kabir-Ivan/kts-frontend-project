import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfiniteGrid from 'components/InfiniteGrid';
import Text from 'components/Text';
import ArrowIcon from 'components/icons/ArrowIcon';
import config from 'config/config';
import useCategoriesStore from 'store/CategoriesStore/useCategoriesStore';
import useProductsStore from 'store/ProductsStore/useProductsStore';
import useSingleProductStore from 'store/SingleProductStore/useSingleProductStore';
import ProductCard from './Components/ProductCard';
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

  React.useEffect(() => {
    console.log(products);
  }, [products]);

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

      <ProductCard isLoaded={isLoaded} product={product} />

      {isLoaded && (
        <div className={styles['product__related-container']}>
          <Text view="p-20" weight="bold">
            Related Items
          </Text>
          <InfiniteGrid products={products} loadMore={load} hasMore={hasMore} />
        </div>
      )}
    </div>
  );
};

export default observer(Product);
