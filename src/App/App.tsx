import './App.scss';

import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import CartIcon from 'components/icons/CartIcon';
import UserIcon from 'components/icons/UserIcon';
import config from 'config/config';
import Main from 'pages/Main';
import Product from 'pages/Product';
import { useQueryParamsStoreInit } from 'store/globals/RootStore';

function App() {
  useQueryParamsStoreInit();

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
        <Route path={config.ENDPOINTS.CATEGORIES} element={<p>categories</p>} />
        <Route path={config.ENDPOINTS.ABOUT} element={<p>about</p>} />
        <Route path={config.ENDPOINTS.PRODUCT}>
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
