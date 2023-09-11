import axios from 'axios';
import classNames from 'classnames';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Loader from 'components/Loader';
import LoadingBlock from 'components/LoadingBlock';
import Text from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import { product, category } from 'pages/Main';
import styles from './Product.module.scss';


const Product = () => {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [data, setData] = React.useState({ id: 0, images: [''], title: '', subtitle: '', description: '', price: 0, category: '' });

    const [products, setProducts] = React.useState<Array<product>>([]);
    const [categories, setCategiries] = React.useState<Array<category>>([]);
    const [batches, setBatches] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const BATCH_SIZE = 4;

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
        const currentCategory = categories.find((c) => c.name == data.category);
        const result = await axios({
            method: 'get',
            url: `https://fake-store-api.glitch.me/api/products`,
            params: {
                offset: BATCH_SIZE * batches,
                limit: BATCH_SIZE,
                include: currentCategory || '',
            }
        });
        setBatches(batches + 1);
        setHasMore(result.data.length == BATCH_SIZE);
        setProducts([...products, ...result.data]);
    }

    const fetchProduct = async () => {
        const result = await axios({
            method: 'get',
            url: `https://fake-store-api.glitch.me/api/products/${id}`
        });
        setData(result.data);
        setIsLoaded(true);
        setHasMore(true);
    }

    React.useEffect(() => {
        fetchProduct();
    }, []);

    React.useEffect(() => {
        if (!products.length) {
            setHasMore(categories && isLoaded);
        }
    }, [categories, isLoaded]);

    const navigate = useNavigate();

    return (
        <div className={styles['product-container']}>
            <div className={styles['back-button-container']}>
                <div className={styles['back-button']} onClick={() => { navigate('/') }}>
                    <ArrowLeftIcon />
                    <div className={styles['back-button-text']}>
                        Back
                    </div>
                </div>
            </div>

            <div className={styles['product-card']}>
                <div className={styles['image-container']}>
                    {isLoaded ? <img src={data.images[0]} className={styles['product-card-image']} /> : <LoadingBlock />}
                </div>
                <div className={styles['product-card-info']}>
                    <div className={styles['product-card-info-top']}>
                        {isLoaded ? <Text view='title' weight='bold'>{data.title}</Text> : <LoadingBlock type='text' />}
                        {isLoaded ? <Text view='p-20' color='secondary'>{data.subtitle}</Text> : <LoadingBlock type='text' />}
                        {isLoaded ? <Text view='p-20' color='secondary'>{data.description}</Text> : <LoadingBlock type='text' />}
                    </div>
                    <div className={styles['product-card-info-bottom']}>
                        {isLoaded ? <Text view='title' weight='bold'>${data.price}</Text> : <LoadingBlock type='text' />}
                        {isLoaded ? <div className={styles['button-container']}>
                            <Button buttonType='primary'>Buy now</Button>
                            <Button buttonType='secondary'>Add to cart</Button>
                        </div> : <LoadingBlock type='text' />}

                    </div>
                </div>
            </div>

            {isLoaded && <div className={styles['related-container']}>
                <Text view='p-20' weight='bold'>Related Items</Text>
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
                            product.id != data.id && <div className={styles['grid-item']} key={product.id}>
                                <Card image={product.images[0]} title={product.title} subtitle={product.description} contentSlot={`$${product.price}`} captionSlot={product.subtitle}
                                    actionSlot={<Button onClick={() => alert(`Added ${product.id}`)}>Add to cart</Button>} onClick={() => { navigate(`/product/${product.id}`) }} />
                            </div>
                        ))}
                    </div>}
                </InfiniteScroll>
            </div>}
        </div>
    )
}

export default Product;