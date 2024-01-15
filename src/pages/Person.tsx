import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from './data.json';
import { PersonCardPage } from '../components';
import Layout from './Layout';
import { Person } from '../utils/types';

const PersonPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (id && !isNaN(parseInt(id)))
      setPerson(data[parseInt(id)]);
  }
  , [id]);

  if (!id || isNaN(parseInt(id)) || !person)
    return (
      <div>
        <h1>PersonPage</h1>
        <p>Person not found</p>
      </div>
    );

  return (
    <Layout>
      <div className='flex flex-row relative w-full h-full'>
        <PersonCardPage person={data[parseInt(id)]} />
        <div className='flex flex-col ml-5'>
          <h1 className='text-2xl font-bold'>{person.prenom}</h1>
          <h1 className='text-xl font-bold'>{person.nom}</h1>
        </div>
      </div>
    </Layout>
  );
};

export default PersonPage;
