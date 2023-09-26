import { observer } from 'mobx-react-lite';
import React from 'react';
import Text from 'components/Text';
import RootStore from 'store/globals';
import CategoryCard from './components/CategoryCard';
import styles from './Categories.module.scss';

const Categories: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['categories']}>
      <Text view="title" weight="bold">
        Categories
      </Text>
      <div className={styles['categories__list']}>
        {RootStore.categories.list.asList().map((category, i) => (
          <CategoryCard category={category} key={i} />
        ))}
      </div>
    </div>
  );
};

export default observer(Categories);
