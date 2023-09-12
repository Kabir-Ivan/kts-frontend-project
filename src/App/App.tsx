import './App.scss';

import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import CartIcon from 'components/icons/CartIcon';
import UserIcon from 'components/icons/UserIcon';
import Main from 'pages/Main';
import Product from 'pages/Product';

function App() {

  return (
    <BrowserRouter>
      <Header links={[{ url: '/', name: 'Products' }, { url: '/categories', name: 'Categories' }, { url: '/about', name: 'About us' }]} additonal={
        <>
          <NavLink to='/cart'>
            <CartIcon />
          </NavLink>
          <NavLink to='/profile'>
            <UserIcon />
          </NavLink>
        </>
      } />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/categories' element={<p>categories</p>} />
        <Route path='/about' element={<p>about</p>} />
        <Route path="/product">
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
