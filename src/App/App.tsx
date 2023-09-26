import './App.scss';

import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';
import CartIcon from 'components/icons/CartIcon';
import UserIcon from 'components/icons/UserIcon';
import config from 'config/config';
import About from 'pages/About';
import Cart from 'pages/Cart';
import Categories from 'pages/Categories';
import Main from 'pages/Main';
import Product from 'pages/Product';
import { useQueryParamsStoreInit, useProductsStoreInit } from 'store/globals/RootStore';

function App() {
  useQueryParamsStoreInit();
  useProductsStoreInit();

  return (
    <>
      <Header
        links={config.HEADER}
        additonal={
          <>
            <NavLink to={config.ENDPOINTS.CART}>
              <CartIcon />
            </NavLink>
            <NavLink to={config.ENDPOINTS.PROFILE}>
              <UserIcon />
            </NavLink>
          </>
        }
      />
      <Routes>
        <Route path={config.ENDPOINTS.PPODUCTS} element={<Main />} />
        <Route path={config.ENDPOINTS.CATEGORIES} element={<Categories />} />
        <Route path={config.ENDPOINTS.ABOUT} element={<About />} />
        <Route path={config.ENDPOINTS.CART} element={<Cart />} />
        <Route path={config.ENDPOINTS.PRODUCT}>
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
