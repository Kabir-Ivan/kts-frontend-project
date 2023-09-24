import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Counter from 'components/Counter';
import config from 'config/config';
import ProductModel from 'entities/product';
import RootStore from 'store/globals';

export type ProductCardProps = {
  product: ProductModel;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const addCallback = React.useCallback(() => {
    RootStore.cart.add(product.id);
    setIsButton(RootStore.cart.getAmount(product.id) < 1);
  }, [product.id]);
  const removeCallback = React.useCallback(() => {
    RootStore.cart.remove(product.id);
    setIsButton(RootStore.cart.getAmount(product.id) < 1);
  }, [product.id]);

  const [isButton, setIsButton] = React.useState(RootStore.cart.getAmount(product.id) < 1);

  return (
    <Card
      image={product.images[0]}
      title={product.title}
      subtitle={product.description}
      contentSlot={`$${product.price}`}
      captionSlot={product.subtitle}
      actionSlot={
        isButton ? (
          <Button onClick={addCallback}>Add to cart</Button>
        ) : (
          <Counter value={RootStore.cart.getAmount(product.id)} onPlus={addCallback} onMinus={removeCallback} />
        )
      }
      onClick={() => {
        navigate(`${config.ENDPOINTS.PRODUCT}/${product.id}`);
      }}
    />
  );
};

export default observer(ProductCard);
