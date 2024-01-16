import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import data from './data.json';
import {
  Button,
  PersonCard,
  PersonCardPage,
  PersonCardPageSkeleton
} from '../components';
import Layout from './Layout';
import { Person } from '../utils/types';
import {
  ComputerDesktopIcon,
  MapPinIcon, UserGroupIcon
} from '@heroicons/react/24/solid';

const PersonPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [person, setPerson] = useState<Person | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && !isNaN(parseInt(id)))
      setPerson(data[parseInt(id)]);
    setLoading(false);
  }
  , [id]);

  let otherPeople = data
    .filter((p) => p.equipe === person?.equipe)
    .filter((p) => p.nom !== person?.nom && p.prenom !== person?.prenom)
    .slice(0, 8);

  if (otherPeople.length <= 0)
    otherPeople = data
      .filter((p) => p.agence === person?.agence)
      .filter((p) => p.nom !== person?.nom && p.prenom !== person?.prenom)
      .slice(0, 8);

  if (loading)
    return (
      <Layout>
        <div className='flex flex-col md:flex-row relative w-full h-full'>
          <PersonCardPageSkeleton />
          <div className='flex flex-col md:ml-5 font-medium mt-5 md:mt-0 animate-pulse'>
            <h1 className='text-4xl md:text-6xl font-bold'>
              Loading...
            </h1>
            <div className='flex flex-col md:flex-row gap-x-5'>
              <div className='flex flex-row items-center'>
                <MapPinIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
                <p className='text-base md:text-lg'>
                  Loading...
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <UserGroupIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
                <p className='text-base md:text-lg'>
                  Loading...
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <ComputerDesktopIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
                <p className='text-base md:text-lg'>
                  Loading...
                </p>
              </div>
            </div>
            <p className='font-regular mt-5 text-lg md:text-xl'>
              Loading...
            </p>
          </div>
        </div>
      </Layout>
    );

  if (!id || isNaN(parseInt(id)) || !person)
    return (
      <Layout>
        <div className='flex flex-col relative py-52'>
          <h1 className='text-6xl font-bold'>
            Erreur 404
          </h1>
          <p className='text-2xl font-regular'>
            Oups, nous n'avons pas trouvé la personne que vous cherchiez.
            N'hésitez pas à consulter nos autres pages dans la navigation.
            Vous y trouverez peut-être votre bonheur.
          </p>
          <Button type='invert' className='mt-8' onClick={() => navigate('/list')}>
            Retour au trombinoscope
          </Button>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <Button type='text' onClick={() => navigate('/list')}>
        &larr; Retour au trombinoscope
      </Button>
      <div className='flex flex-col md:flex-row relative w-full h-full mt-5'>
        <PersonCardPage person={data[parseInt(id)]} />
        <div className='flex flex-col md:ml-5 font-medium mt-5 md:mt-0'>
          <h1 className='text-4xl md:text-6xl font-bold'>
            {person.prenom} {person.nom}
          </h1>
          <div className='flex flex-col md:flex-row gap-x-5 mt-5'>
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
      <div className='gap-5 mx-auto flex flex-col md:flex-row flex-wrap mt-20
      justify-between'>
        <h1 className='text-4xl font-bold col-span-full'>
          D'autres personnes qui pourraient vous intéresser
        </h1>
        {otherPeople.map((p, i) => (
          <PersonCard key={p.nom} person={p} id={i} />
        ))}
      </div>
    </Layout>
  );
};

export default PersonPage;
