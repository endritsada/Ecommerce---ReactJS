// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Login from './Login'
import Register from './Register';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

    </Routes>
  );
}

export default AppRoutes;
