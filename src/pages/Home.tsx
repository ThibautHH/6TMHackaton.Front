import React, { FunctionComponent } from 'react';
import PersonCard from '../components/PersonCard';
import data from './data.json';

const Home: FunctionComponent = () => {
  // JS
  return (
    // HTML
    <>
      <h1>Home</h1>
      <PersonCard person={data[0]} />
    </>
  );
};

export default Home;
