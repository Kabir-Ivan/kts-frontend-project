import './App.scss';

import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import CartIcon from 'components/icons/CartIcon';
import UserIcon from 'components/icons/UserIcon';
import config from 'config/config';
import Main from 'pages/Main';
import Product from 'pages/Product';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

function App() {
  useQueryParamsStoreInit();

  return (
    <>
      <Header
        links={[
          { url: '/', name: 'Products' },
          { url: '/categories', name: 'Categories' },
          { url: '/about', name: 'About us' },
        ]}
        additonal={
          <>
            <NavLink to={config.CART_LINK}>
              <CartIcon />
            </NavLink>
            <NavLink to={config.PROFILE_LINK}>
              <UserIcon />
            </NavLink>
          </>
        }
      />
      <Routes>
        <Route path={config.PPODUCTS_LINK} element={<Main />} />
        <Route path={config.CATEGORIES_LINK} element={<p>categories</p>} />
        <Route path={config.ABOUT_LINK} element={<p>about</p>} />
        <Route path={config.PRODUCT_LINK}>
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
