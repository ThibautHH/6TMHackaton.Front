import React, { FunctionComponent } from 'react';
import PersonCard from '../components/PersonCard';
import data from './data.json';
import Layout from './Layout';

const List: FunctionComponent = () => {
  return (
    <Layout>
      <div className='grid grid-cols-3 gap-5'>
        {data.slice(0, 9).map((person) => (
          <PersonCard key={person.nom} person={person} />
        ))}
      </div>
    </Layout>
  );
};

export default List;
