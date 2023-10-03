import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'components/Card';
import config from 'config/config';
import CategoryModel from 'entities/category';
import styles from './CategoryCard.module.scss';

export type CategoryCardProps = {
  category: CategoryModel;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const go = React.useCallback(() => {
    navigate(`${config.ENDPOINTS.PPODUCTS}?include=${category.id}`);
  }, [category.id, navigate]);
  return <Card image={category.image} title={category.name} subtitle="" className={styles['card']} onClick={go} />;
};

export default CategoryCard;
