import { CategoryApi, CategoryModel, normalizeCategory } from './CategoryModel';

export type CategoriesListApi = {
  categories: CategoryApi[];
};

export type CategoriesListModel = {
  categories: CategoryModel[];
};

export const normalizeCategoriesList = (from: CategoriesListApi): CategoriesListModel => ({
  categories: from.categories.map((category: CategoryApi) => normalizeCategory(category)),
});
