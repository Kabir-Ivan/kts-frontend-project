import { observer } from 'mobx-react-lite';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import RootStore from 'store/RootStore';
import { CategoryModel } from 'store/models/CategoryModel';
import Collection from 'store/models/shared/Collection';
import styles from './InputContainer.module.scss';

export type InputContainerProps = {
  loadProducts: (clear: boolean) => void;
  categories: Collection<number, CategoryModel>;
};

const InputContainer: React.FC<InputContainerProps> = ({ categories, loadProducts }) => {
  const [, setSearchParams] = useSearchParams();
  const [dropdownValue, setDropdownValue] = React.useState<Option[]>([]);
  const [inputValue, setInputValue] = React.useState(RootStore.query.getParam('substring')?.toString() || '');
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
    <div className={styles['input-container']}>
      <div className={styles['input-container__text-input-container']}>
        <div className={styles['input-container__text-input-wrap']}>
          <Input
            value={inputValue}
            placeholder="Search product"
            onChange={(value) => {
              setInputValue(value);
            }}
          />
        </div>
        <Button
          onClick={() => {
            search();
          }}
        >
          Find now
        </Button>
      </div>
      <MultiDropdown
        className={styles['input-container__categories-dropdown']}
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
  );
};

export default observer(InputContainer);
