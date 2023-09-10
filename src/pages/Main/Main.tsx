import axios from 'axios';
import classNames from 'classnames';
import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import styles from './Main.module.scss';

const Main = () => {
    const [categories, setCategiries] = React.useState([]);
    const [products, setProducts] = React.useState<Array<any>>([]);
    const [batches, setBatches] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const [includeCategories, setIncludeCategories] = React.useState<string[]>([]);
    const [requiredSubstring, setRequiredSubstring] = React.useState('');
    const [searchOptions, setSearchOptions] = React.useState<any>({
        include: [],
        substring: ''
    });
    const BATCH_SIZE = 24;
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: 'https://fake-store-api.glitch.me/api/categories'
            });

            setCategiries(result.data);
        }

        fetch();
    }, []);

    const fetchProducts = async () => {
        const result = await axios({
            method: 'get',
            url: `https://fake-store-api.glitch.me/api/products`,
            params: {
                offset: BATCH_SIZE * batches,
                limit: BATCH_SIZE,
                include: searchOptions.include.join('|'),
                substring: searchOptions.substring
            }
        });
        setBatches(batches + 1);
        setHasMore(result.data.length == BATCH_SIZE);
        setProducts([...products, ...result.data]);
    }

    const prefetchProducts = async () => {
        const result = await axios({
            method: 'get',
            url: `https://fake-store-api.glitch.me/api/products`,
            params: {
                offset: 0,
                limit: BATCH_SIZE,
                include: searchOptions.include.join('|'),
                substring: searchOptions.substring
            }
        });
        setBatches(1);
        setHasMore(result.data.length == BATCH_SIZE);
        setProducts(result.data);
    }

    React.useEffect(() => {
        if (products.length === 0) {
            prefetchProducts();
        }
    }, [products]);

    return (
        <div className={styles['main-container']}>
            <div className={styles['products-title-container']}>
                <Text color='primary' view='title' weight='bold'>Products</Text>
                <Text color='secondary' view='p-20'>We display products based on the latest products we have, if you want to see our old products please enter the name of the item</Text>
            </div>
            <div className={styles['main-input-container']}>
                <div className={styles['text-input-container']}>
                    <div className={styles['text-input-wrap']}>
                        <Input value='' placeholder='Search product' onChange={(value) => { setRequiredSubstring(value) }} />
                    </div>
                    <Button onClick={() => {
                        setSearchOptions({
                            include: includeCategories,
                            substring: requiredSubstring
                        });
                        setProducts([]);
                        setHasMore(true);
                        setBatches(0);
                    }}>Find now</Button>
                </div>
                <MultiDropdown className={styles['categories-dropdown']} options={categories.map((category: any) => { return { key: category.id, value: category.name } })}
                    value={[]} onChange={(value) => { setIncludeCategories(value.map((v) => v.key)) }}
                    getTitle={(options) => options.sort().map((opt) => opt.value).join(', ')} />
            </div>
            <InfiniteScroll
                className='fullwidth'
                dataLength={products.length} //This is important field to render the next data
                next={fetchProducts}
                hasMore={hasMore}
                loader={<Loader size='l' className={classNames('centered', styles['main-products-loader'])} />}
                endMessage={
                    <div className={styles['horizontal-line']}>
                    </div>
                }
            >
                {<div className={styles['products-grid']}>
                    {products.map((product: any) => (
                        <div className={styles['grid-item']} key={product.id}>
                            <Card image={product.images[0]} title={product.title} subtitle={product.description} contentSlot={`$${product.price}`} captionSlot={product.subtitle}
                                actionSlot={<Button onClick={() => alert(`Added ${product.id}`)}>Add to cart</Button>} onClick={() => { navigate(`/product/${product.id}`) }} />
                        </div>
                    ))}
                </div>}
            </InfiniteScroll>
        </div>
    )
}

export default Main;