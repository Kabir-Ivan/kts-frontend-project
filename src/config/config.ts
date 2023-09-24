const BASE_URL = '';
const ENDPOINTS = {
  PPODUCTS: `/`,
  CATEGORIES: `/categories`,
  ABOUT: `/about`,
  PRODUCT: `/product`,
  CART: `/cart`,
  PROFILE: `/profile`,
};
const config = {
  HEADER: [
    { url: ENDPOINTS.PPODUCTS, name: 'Products' },
    { url: ENDPOINTS.CATEGORIES, name: 'Categories' },
    { url: ENDPOINTS.ABOUT, name: 'About us' },
  ],
  API: {
    PRODUCTS_URL: `${BASE_URL}/api/products`,
    CATEGORIES_URL: `${BASE_URL}/api/categories`,
    PRODUCT_URL: `${BASE_URL}/api/products/`,
    CATEGORY_URL: `${BASE_URL}/api/categories/`,
    CART_URL: `${BASE_URL}/api/cart`,
  },
  ENDPOINTS: ENDPOINTS,
  BATCH_SIZE: 12,
};
export default config;
