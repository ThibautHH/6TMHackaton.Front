import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Admin,
  Home,
  List,
  Login,
  NotFound,
  PersonPage
} from '../pages';
import { RequireAuth } from 'react-auth-kit';

const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/list/:id' element={<PersonPage />} />
      <Route path='/list' element={<List />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={
        <RequireAuth loginPath='/login'>
          <Admin />
        </RequireAuth>
      } />
    </Routes>
  );
};

export default Router;
