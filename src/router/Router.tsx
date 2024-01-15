import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, List } from '../pages';

const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/list' element={<List />} />
    </Routes>
  );
};

export default Router;
