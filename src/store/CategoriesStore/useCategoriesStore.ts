import React from 'react';
import CategoriesStore from 'store/CategoriesStore';
import { CategoryModel } from 'store/models/CategoryModel';
import Collection from 'store/models/shared/Collection';
import { useLocalStore } from 'utils/useLocalStore';

export type UseCategoriesStoreResult = {
  categories: CategoryModel[];
  fetchCategories: () => void;
};

const useCategoriesStore = () => {
  const [categories, setCategories] = React.useState<Collection<number, CategoryModel>>(
    new Collection<number, CategoryModel>([], (element) => element.id),
  );
  const loader = useLocalStore(
    () =>
      new CategoriesStore((array: Collection<number, CategoryModel>) => {
        setCategories(array);
      }),
  );

  const fetchCategories = () => {
    loader.getCategoriesList();
  };
  return { categories, fetchCategories };
};

export default useCategoriesStore;
