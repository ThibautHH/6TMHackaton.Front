import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from './data.json';
import { Button, PersonCard, PersonCardPage } from '../components';
import Layout from './Layout';
import { Person } from '../utils/types';
import {
  ComputerDesktopIcon,
  MapPinIcon, UserGroupIcon
} from '@heroicons/react/24/solid';

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
      <div className='flex flex-col md:flex-row relative w-full h-full'>
        <PersonCardPage person={data[parseInt(id)]} />
        <div className='flex flex-col md:ml-5 font-medium mt-5 md:mt-0'>
          <h1 className='text-4xl md:text-6xl font-bold'>
            {person.prenom} {person.nom}
          </h1>
          <div className='flex flex-col md:flex-row gap-x-5'>
            <div className='flex flex-row items-center'>
              <MapPinIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
              <p className='text-base md:text-lg'>
                {person.agence}
              </p>
            </div>
            <div className='flex flex-row items-center'>
              <UserGroupIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
              <p className='text-base md:text-lg'>
                {person.equipe}
              </p>
            </div>
            <div className='flex flex-row items-center'>
              <ComputerDesktopIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
              <p className='text-base md:text-lg'>
                {person.poste}
              </p>
            </div>
          </div>
          <p className='font-regular mt-5 text-lg md:text-xl'>
            {person.description}
          </p>
          <div className='flex flex-col gap-2 mt-5'>
            {person.contact?.linkedin && (
              <Button type='invert' link={person.contact.linkedin}>
                Voir le profil LinkedIn &rarr;
              </Button>
            )}
            {person.contact?.email && (
              <Button type='invert' link={`mailto:${person.contact.email}`}>
                Envoyer un mail &rarr;
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      gap-5 mt-24'>
        <h1 className='text-4xl font-bold col-span-full'>
          D'autres personnes qui pourraient vous intéresser
        </h1>
        {data
          .filter((p) => p.equipe === person.equipe)
          .slice(0, 10).map((p, i) => (
            <PersonCard key={p.nom} person={p} id={i} />
          ))
        }
      </div>
    </Layout>
  );
};

export default PersonPage;
