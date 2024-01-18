import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  PersonCard,
  PersonCardPage,
  PersonCardPageSkeleton
} from '../components';
import Layout from './Layout';
import { Employee, Premise, Team } from '../utils/types';
import {
  ComputerDesktopIcon,
  MapPinIcon, UserGroupIcon
} from '@heroicons/react/24/solid';
import { getEmployees, getPremises, getTeams } from '../utils/api';

interface Values {
  id: number,
  name: string,
  disabled?: boolean,
  _id?: string,
  premise?: string
}

const PersonPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [person, setPerson] = useState<Employee | null>(null);
  const navigate = useNavigate();
  const [data, setData] = useState<Employee[]>([]);
  const [premises, setPremises] = useState<Premise[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsValues, setTeamsValues] = useState<Values[]>([]);

  useEffect(() => {
    const fetchPremises = async () => {
      const response = await getPremises();
      if (response.status !== 200)
        return;
      const premises: Premise[] = response.data['hydra:member'];
      setPremises(premises);
    };
    const fetchTeams = async () => {
      const response = await getTeams();
      if (response.status !== 200)
        return;
      const teams: Team[] = response.data['hydra:member'];
      setTeams(teams);
      setTeamsValues(teams.map((team, id) => ({
        id: id + 1,
        name: team.name,
        _id: team['@id'] as string,
        premise: team.premise
      })));
    };
    fetchTeams();
    fetchPremises();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployees();
      const responsePremise = await getPremises();
      const responseTeam = await getTeams();
      if (response.status !== 200 || responsePremise.status !== 200
        || responseTeam.status !== 200)
        return;
      let employees: Employee[] = response.data['hydra:member'];
      employees = employees.map((employee) => ({
        ...employee,
        premise: premises
          .find((premise) => premise['@id'] === teams
            .find((team) => team['@id'] === employee.team)?.premise)
      }));
      setData(employees);
    };
    if (teamsValues.length > 0)
      fetchEmployees();
  }, [teamsValues]);

  useEffect(() => {
    if (id && !isNaN(parseInt(id))) {
      setPerson(data
        .find((p) => p.id === parseInt(id)) || null);
    }
    setLoading(false);
  }
  , [data]);

  let otherPeople = data
    .filter((p) => p.team === person?.team)
    .filter((p) => p.id !== person?.id)
    .slice(0, 10);

  if (otherPeople.length <= 0)
    otherPeople = data
      .filter((p) => p.premise === person?.premise?.['@id'])
      .filter((p) => p.id !== person?.id)
      .slice(0, 10);

  if (otherPeople.length <= 0)
    otherPeople = data
      .filter((p) => p.id !== person?.id)
      .slice(0, 10);

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

  if (!person)
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
        <PersonCardPage person={person} />
        <div className='flex flex-col md:ml-5 font-medium mt-5 md:mt-0'>
          <h1 className='text-4xl md:text-6xl font-bold'>
            {person.firstName} {person.name}
          </h1>
          <div className='flex flex-col md:flex-row gap-x-5 mt-5'>
            <div className='flex flex-row items-center'>
              <MapPinIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
              <p className='text-base md:text-lg'>
                {person.premise?.city}
              </p>
            </div>
            <div className='flex flex-row items-center'>
              <UserGroupIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
              <p className='text-base md:text-lg'>
                {teams.find((t) => t['@id'] === person.team)?.name}
              </p>
            </div>
            <div className='flex flex-row items-center'>
              <ComputerDesktopIcon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
              <p className='text-base md:text-lg'>
                {person.position}
              </p>
            </div>
          </div>
          <p className='font-regular mt-5 text-lg md:text-xl'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
            exercitationem laborum fuga, aspernatur voluptatibus explicabo
            asperiores molestias tempora, ea rem minus temporibus officiis
            nesciunt. Sed illum illo facere adipisci iusto?
          </p>
          <div className='flex flex-col gap-2 mt-5'>
            <Button type='invert'>
              Voir le profil LinkedIn &rarr;
            </Button>
            <Button type='invert'>
              Envoyer un mail &rarr;
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-20'>
        <h1 className='text-4xl font-bold col-span-full'>
          D'autres personnes qui pourraient vous intéresser
        </h1>
        <div className='gap-5 mx-auto flex flex-col md:flex-row flex-wrap mt-5
      justify-between'>
          {otherPeople.map((p) => (
            <PersonCard key={p.name} employee={p} id={p.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PersonPage;
