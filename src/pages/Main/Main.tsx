import axios from 'axios';
import classNames from 'classnames';
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
import styles from './Main.module.scss';


export type product = {
    id: number,
    title: string,
    subtitle: string,
    description: string,
    images: Array<string>,
    category: string,
    price: number
}

export type searchOptions = {
    include: Array<string>,
    substring: string
}

export type category = {
    id: number,
    name: string
}

const Main = () => {
    const [categories, setCategiries] = useState([]);
    const [products, setProducts] = useState<Array<product>>([]);
    const [batches, setBatches] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [includeCategories, setIncludeCategories] = useState<string[]>([]);
    const [requiredSubstring, setRequiredSubstring] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [dropdownValue, setDropdownValue] = useState<Array<Option>>([]);
    const [inputValue, setInputValue] = useState('');
    const [searchOptions, setSearchOptions] = useState<searchOptions>({
        include: [],
        substring: ''
    });
    const [totalProducts, setTotalProducts] = React.useState(0);
    const BATCH_SIZE = 24;
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: config.CATEGORIES_URL
            });

            setCategiries(result.data);
        }

        fetch();

    }, []);

    React.useEffect(() => {
        searchOptions.substring = (searchParams.get('substring') || '');
        searchOptions.include = (searchParams.get('include') || '').split('|');
        setIncludeCategories(searchOptions.include);
        setRequiredSubstring(searchOptions.substring);
        setInputValue(searchOptions.substring);
        setSearchOptions(searchOptions);
    }, []);

    React.useEffect(() => {
        setDropdownValue(categories.map((category: category) => { return { key: String(category.id), value: category.name } }).filter((option) =>
            (searchParams.get('include') || '').split('|').includes(option.key)));
    }, [categories, searchParams])

    const fetchProducts = async () => {
        const result = await axios({
            method: 'get',
            url: config.PRODUCTS_URL,
            params: {
                offset: BATCH_SIZE * batches,
                limit: BATCH_SIZE,
                include: searchOptions.include.join('|'),
                substring: searchOptions.substring
            }
        });
        const fetchedProducts = result.data.products;
        setTotalProducts(result.data.total);
        setBatches(batches + 1);
        setHasMore(fetchedProducts.length == BATCH_SIZE);
        setProducts([...products, ...fetchedProducts]);
    }

    const prefetchProducts = async () => {
        const result = await axios({
            method: 'get',
            url: config.PRODUCTS_URL,
            params: {
                offset: 0,
                limit: BATCH_SIZE,
                include: searchOptions.include.join('|'),
                substring: searchOptions.substring
            }
        });
        const fetchedProducts = result.data.products;
        setTotalProducts(result.data.total);
        setBatches(1);
        setHasMore(fetchedProducts.length == BATCH_SIZE);
        setProducts(fetchedProducts);
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
                        <Input value={inputValue} placeholder='Search product' onChange={(value) => {
                            setRequiredSubstring(value);
                        }} />
                    </div>
                    <Button onClick={() => {
                        searchParams.set('include', includeCategories.join('|'));
                        searchParams.set('substring', requiredSubstring);
                        setSearchParams(searchParams);
                        setSearchOptions({
                            include: includeCategories,
                            substring: requiredSubstring
                        });
                        setProducts([]);
                        setHasMore(true);
                        setBatches(0);
                    }}>Find now</Button>
                </div>
                <MultiDropdown className={styles['categories-dropdown']} options={categories.map((category: category) => { return { key: String(category.id), value: category.name } })}
                    value={dropdownValue} onChange={(value) => {
                        setIncludeCategories(value.map((v) => v.key));
                    }}
                    getTitle={(options) => options.sort().map((opt) => opt.value).join(', ')} />
            </div>
            <Text view='p-20' weight='bold' className={styles['total-text']}>Total products: {totalProducts}</Text>
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
                    {products.map((product: product) => (
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