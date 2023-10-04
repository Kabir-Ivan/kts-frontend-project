import './App.scss';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import CartIconHeader from 'components/CartIconHeader';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import UserIcon from 'components/icons/UserIcon';
import config from 'config/config';
import About from 'pages/About';
import Cart from 'pages/Cart';
import Categories from 'pages/Categories';
import Checkout from 'pages/Checkout';
import Forgot from 'pages/Forgot';
import Login from 'pages/Login';
import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import Product from 'pages/Product';
import Profile from 'pages/Profile';
import Recover from 'pages/Recover';
import Signup from 'pages/Signup';
import Success from 'pages/Success';
import RootStore, { useQueryParamsStoreInit, useProductsStoreInit } from 'store/globals/RootStore';

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
              <CartIconHeader />
            </NavLink>
            <PrivateRoute
              condition={RootStore.user.isLoggedIn && !RootStore.user.isError}
              onTrue={
                <NavLink to={config.ENDPOINTS.PROFILE}>
                  <UserIcon />
                </NavLink>
              }
              onFalse={
                <NavLink to={config.ENDPOINTS.LOGIN}>
                  <UserIcon />
                </NavLink>
              }
            />
          </>
        }
      />
      <Routes>
        <Route path={config.ENDPOINTS.PPODUCTS} element={<Main />} />
        <Route path={config.ENDPOINTS.CATEGORIES} element={<Categories />} />
        <Route path={config.ENDPOINTS.ABOUT} element={<About />} />
        <Route path={config.ENDPOINTS.CART} element={<Cart />} />
        <Route path={config.ENDPOINTS.PROFILE} element={<Profile />} />
        <Route path={config.ENDPOINTS.LOGIN} element={<Login />} />
        <Route path={config.ENDPOINTS.SIGNUP} element={<Signup />} />
        <Route path={config.ENDPOINTS.CHECKOUT} element={<Checkout />} />
        <Route path={config.ENDPOINTS.SUCCESS} element={<Success />} />
        <Route path={config.ENDPOINTS.FORGOT} element={<Forgot />} />
        <Route path={config.ENDPOINTS.RECOVER}>
          <Route path=":id" element={<Recover />} />
        </Route>
        <Route path={config.ENDPOINTS.PRODUCT}>
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default observer(App);
