const BASE_URL = '';
const ENDPOINTS = {
  PPODUCTS: `/`,
  CATEGORIES: `/categories`,
  ABOUT: `/about`,
  PRODUCT: `/product`,
  CART: `/cart`,
  PROFILE: `/profile`,
  LOGIN: `/login`,
  SIGNUP: `/signup`,
  CHECKOUT: `/checkout`,
  RECOVER: `/recover`,
  SUCCESS: `/success`,
  FORGOT: `/forgot`,
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
    ORDER_URL: `${BASE_URL}/api/order`,
    SIGNUP_URL: `${BASE_URL}/api/signup`,
    LOGIN_URL: `${BASE_URL}/api/login`,
    LOGOUT_URL: `${BASE_URL}/api/logout`,
    USER_URL: `${BASE_URL}/api/user`,
    FORGOT_URL: `${BASE_URL}/api/reset`,
    RECOVER_URL: `${BASE_URL}/api/recover`,
  },
  ENDPOINTS: ENDPOINTS,
  BATCH_SIZE: 12,
};
export default config;
