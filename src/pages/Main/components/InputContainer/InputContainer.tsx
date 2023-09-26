import { observer } from 'mobx-react-lite';
import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import CategoryModel from 'entities/category';
import { CategoriesStore, FilterStore } from 'store/locals';
import { useLocalStore } from 'utils/useLocalStore';
import styles from './InputContainer.module.scss';

export type InputContainerProps = {
  loadProducts: (clear: boolean) => void;
};

const InputContainer: React.FC<InputContainerProps> = ({ loadProducts }) => {
  const categoriesLoader: CategoriesStore = useLocalStore(() => new CategoriesStore());
  const filterLoader: FilterStore = useLocalStore(() => new FilterStore());

  React.useEffect(() => {
    categoriesLoader.getCategoriesList();
  }, [categoriesLoader]);

  const search = React.useCallback(() => {
    loadProducts(true);
  }, [loadProducts]);

  const setInputValue = React.useCallback(
    (value: string) => {
      filterLoader.setFilters({
        input: value,
      });
    },
    [filterLoader],
  );

  const setDropdownValue = React.useCallback(
    (value: Option[]) => {
      filterLoader.setFilters({
        dropdown: value,
      });
    },
    [filterLoader],
  );

  const getTitle = React.useCallback(
    (options: Option[]) =>
      options
        .slice()
        .sort()
        .map((option: Option) => option.value)
        .join(', ') || 'Select categories',
    [],
  );

  return (
    <div className={styles['input-container']}>
      <div className={styles['input-container__text-input-container']}>
        <div className={styles['input-container__text-input-wrap']}>
          <Input value={filterLoader.input} placeholder="Search product" onChange={setInputValue} />
        </div>
        <Button onClick={search}>Find now</Button>
      </div>
      <MultiDropdown
        className={styles['input-container__categories-dropdown']}
        options={categoriesLoader.list.asList().map((category: CategoryModel) => {
          return { key: String(category.id), value: category.name };
        })}
        value={filterLoader.dropdown}
        onChange={setDropdownValue}
        getTitle={getTitle}
      />
    </div>
  );
};

export default observer(InputContainer);
