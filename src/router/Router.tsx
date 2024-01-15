import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, List, NotFound, PersonPage } from '../pages';

const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/list/:id' element={<PersonPage />} />
      <Route path='/list' element={<List />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;
