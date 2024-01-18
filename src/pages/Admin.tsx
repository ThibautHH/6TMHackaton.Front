import React, { FunctionComponent, useEffect, useState } from 'react';
import Layout from './Layout';
import { Employee, Person, Premise, Team } from '../utils/types';
import data from './data.json';
import PopHover from '../components/PopHover';
import {
  DocumentArrowDownIcon,
  DocumentPlusIcon,
  MapPinIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import {
  Button,
  Dropdown,
  Input,
  UpdateUserModal
} from '../components';
import { createEmployee, createPremise, getPremises, getTeams } from '../utils/api';
import { AuthUser } from '../utils';

interface Values {
  id: number,
  text: string,
  disabled?: boolean
}

const jobsValues: Values[] = Array  // API
  .from(new Set(data.map(employe => employe.poste)))
  .map((name, id) => ({ id: id + 1, text: name }));

const Admin: FunctionComponent = () => {
  const [input, setInput] = useState<string>('');
  const [length, setLength] = useState<{ id: number, text: string }>({
    id: 1, text: '10'
  });
  const [filteredData, setFilteredData] = useState(data);
  const [modalState, setModalState] = useState<'update' | 'create' | null>(null);
  const [updatingUser, setUpdatingUser] = useState<Person | null>(null);
  const [createInput, setCreateInput] = useState<'agence' | 'equipe' |
  'poste' | null>(null);
  const [createInputValue, setCreateInputValue] = useState<string>('');
  const [agencesValues, setAgencesValues] = useState<{
    id: number, text: string, _id: string
  }[]>([]);
  const [teamsValues, setTeamsValues] = useState<{
    id: number, text: string, _id: string
  }[]>([]);
  const user = AuthUser();

  useEffect(() => {
    const fetchPremises = async () => {
      const response = await getPremises();
      console.log('response', response);
      if (response.status !== 200)
        return;
      const premises: Premise[] = response.data['hydra:member'];
      setAgencesValues(premises.map((premise, id) => ({
        id: id + 1,
        text: premise.city,
        _id: premise['@id'] as string
      })));
    };
    const fetchTeams = async () => {
      const response = await getTeams();
      console.log('response', response);
      if (response.status !== 200)
        return;
      const teams: Team[] = response.data['hydra:member'];
      setTeamsValues(teams.map((team, id) => ({
        id: id + 1,
        text: team.name,
        _id: team['@id'] as string
      })));
    };
    fetchPremises();
    fetchTeams();
  }, []);

  useEffect(() => {
    if (input === '')
      setFilteredData(data);
    else
      setFilteredData(data
        .filter((item) =>
          item.nom.toLowerCase().includes(input.toLowerCase()) ||
          item.prenom.toLowerCase().includes(input.toLowerCase())
        )
      );
  }, [input, length]);

  return (
    <Layout>
      {modalState === 'create' && updatingUser && (
        <UpdateUserModal
          title='Créer un utilisateur'
          close={() => setModalState(null)}
        >
          <div className='flex flex-col gap-y-5 text-left'>
            <Input
              type='text'
              required
              placeholder='Nom'
              id='nom'
              title='Nom'
              value={updatingUser.nom}
              onChange={(e) => {
                if (updatingUser)
                  setUpdatingUser({
                    ...updatingUser,
                    nom: e.target.value
                  });
              }}
            />
            <Input
              type='text'
              required
              placeholder='Prénom'
              id='prenom'
              title='Prénom'
              value={updatingUser.prenom}
              onChange={(e) => {
                if (updatingUser)
                  setUpdatingUser({
                    ...updatingUser,
                    prenom: e.target.value
                  });
              }}
            />
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Agence'
                required
                values={agencesValues}
                value={agencesValues.find((item) => item.text === updatingUser.agence)}
                addValue={() => setCreateInput('agence')}
                onChange={(e) => {
                  if (updatingUser)
                    setUpdatingUser({
                      ...updatingUser,
                      agence: e.text
                    });
                }}
              />
              {createInput === 'agence' && (
                <div className='flex flex-row gap-2 w-full justify-between'>
                  <Input
                    type='text'
                    required
                    placeholder="Nom de l'agence"
                    id='agence'
                    value={createInputValue}
                    onChange={(e) => setCreateInputValue(e.target.value)}
                  />
                  <Button
                    type='secondary'
                    onClick={async () => {
                      const newAgence: Premise = {
                        city: createInputValue
                      };
                      const response = await createPremise(newAgence, user?.token);
                      if (response.status === 201) {
                        setCreateInputValue('');
                        setCreateInput(null);
                      }
                      return 0;
                    }}
                  >
                    <PlusIcon className='w-5 h-5' />
                    Ajouter
                  </Button>
                  <Button
                    type='invert'
                    onClick={() => setCreateInput(null)}
                  >
                    <XMarkIcon className='w-5 h-5' />
                    Annuler
                  </Button>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Equipe'
                required
                values={teamsValues}
                value={teamsValues.find((item) => item.text === updatingUser.equipe)}
                addValue={() => setCreateInput('equipe')}
                onChange={(e) => {
                  if (updatingUser)
                    setUpdatingUser({
                      ...updatingUser,
                      equipe: e.text
                    });
                }}
              />
              {createInput === 'equipe' && (
                <div className='flex flex-row gap-2 w-full justify-between'>
                  <Input
                    type='text'
                    required
                    placeholder="Nom de l'équipe"
                    id='equipe'
                    value={createInputValue}
                    onChange={(e) => setCreateInputValue(e.target.value)}
                  />
                  <Button
                    type='secondary'
                    onClick={() => {
                      console.log('Create'); // API
                      return 0;
                    }}
                  >
                    <PlusIcon className='w-5 h-5' />
                    Ajouter
                  </Button>
                  <Button
                    type='invert'
                    onClick={() => setCreateInput(null)}
                  >
                    <XMarkIcon className='w-5 h-5' />
                    Annuler
                  </Button>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Poste'
                required
                values={jobsValues}
                value={jobsValues.find((item) => item.text === updatingUser.poste)}
                addValue={() => setCreateInput('poste')}
                onChange={(e) => {
                  if (updatingUser)
                    setUpdatingUser({
                      ...updatingUser,
                      poste: e.text
                    });
                }}
              />
              {createInput === 'poste' && (
                <div className='flex flex-row gap-2 w-full justify-between'>
                  <Input
                    type='text'
                    required
                    placeholder="Nom du poste"
                    id='poste'
                    value={createInputValue}
                    onChange={(e) => setCreateInputValue(e.target.value)}
                  />
                  <Button
                    type='secondary'
                    onClick={() => {
                      console.log('Create'); // API
                      return 0;
                    }}
                  >
                    <PlusIcon className='w-5 h-5' />
                    Ajouter
                  </Button>
                  <Button
                    type='invert'
                    onClick={() => setCreateInput(null)}
                  >
                    <XMarkIcon className='w-5 h-5' />
                    Annuler
                  </Button>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-y-2 mt-5'>
              <Button
                type='secondary'
                className='w-full'
                onClick={async () => {
                  const newUser: Employee = {
                    name: updatingUser.nom,
                    firstName: updatingUser.prenom,
                    position: updatingUser.agence,
                    team: updatingUser.equipe
                  };
                  const response = await createEmployee(newUser, user?.token);
                  console.log('response', response);
                  return 0;
                }}
              >
                <DocumentPlusIcon className='w-5 h-5' />
                Ajouter l'employé
              </Button>
              <Button
                type='invert'
                className='w-full'
                onClick={() => setModalState(null)}
              >
                <XMarkIcon className='w-5 h-5' />
                Annuler les modifications
              </Button>
            </div>
          </div>
        </UpdateUserModal>
      )}
      {modalState === 'update' && updatingUser && (
        <UpdateUserModal
          title='Modifier un utilisateur'
          close={() => setModalState(null)}
        >
          <div className='flex flex-col gap-y-5 text-left'>
            <Input
              type='text'
              required
              placeholder='Nom'
              id='nom'
              value={updatingUser.nom}
              title='Nom'
              onChange={(e) => {
                if (updatingUser)
                  setUpdatingUser({
                    ...updatingUser,
                    nom: e.target.value
                  });
              }}
            />
            <Input
              type='text'
              required
              placeholder='Prénom'
              id='prenom'
              value={updatingUser.prenom}
              title='Prénom'
              onChange={(e) => {
                if (updatingUser)
                  setUpdatingUser({
                    ...updatingUser,
                    prenom: e.target.value
                  });
              }}
            />
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Agence'
                required
                values={agencesValues}
                value={agencesValues.find((item) => item.text === updatingUser.agence)}
                addValue={() => setCreateInput('agence')}
                onChange={(e) => {
                  if (updatingUser)
                    setUpdatingUser({
                      ...updatingUser,
                      agence: e.text
                    });
                }}
              />
              {createInput === 'agence' && (
                <div className='flex flex-row gap-2 w-full justify-between'>
                  <Input
                    type='text'
                    required
                    placeholder="Nom de l'agence"
                    id='agence'
                    value={createInputValue}
                    onChange={(e) => setCreateInputValue(e.target.value)}
                  />
                  <Button
                    type='secondary'
                    onClick={() => {
                      console.log('Create'); // API
                      return 0;
                    }}
                  >
                    <PlusIcon className='w-5 h-5' />
                    Ajouter
                  </Button>
                  <Button
                    type='invert'
                    onClick={() => setCreateInput(null)}
                  >
                    <XMarkIcon className='w-5 h-5' />
                    Annuler
                  </Button>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Equipe'
                required
                values={teamsValues}
                value={teamsValues.find((item) => item.text === updatingUser.equipe)}
                addValue={() => setCreateInput('equipe')}
                onChange={(e) => {
                  if (updatingUser)
                    setUpdatingUser({
                      ...updatingUser,
                      equipe: e.text
                    });
                }}
              />
              {createInput === 'equipe' && (
                <div className='flex flex-row gap-2 w-full justify-between'>
                  <Input
                    type='text'
                    required
                    placeholder="Nom de l'équipe"
                    id='equipe'
                    value={createInputValue}
                    onChange={(e) => setCreateInputValue(e.target.value)}
                  />
                  <Button
                    type='secondary'
                    onClick={() => {
                      console.log('Create'); // API
                      return 0;
                    }}
                  >
                    <PlusIcon className='w-5 h-5' />
                    Ajouter
                  </Button>
                  <Button
                    type='invert'
                    onClick={() => setCreateInput(null)}
                  >
                    <XMarkIcon className='w-5 h-5' />
                    Annuler
                  </Button>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Poste'
                required
                values={jobsValues}
                value={jobsValues.find((item) => item.text === updatingUser.poste)}
                addValue={() => setCreateInput('poste')}
                onChange={(e) => {
                  if (updatingUser)
                    setUpdatingUser({
                      ...updatingUser,
                      poste: e.text
                    });
                }}
              />
              {createInput === 'poste' && (
                <div className='flex flex-row gap-2 w-full justify-between'>
                  <Input
                    type='text'
                    required
                    placeholder="Nom du poste"
                    id='poste'
                    value={createInputValue}
                    onChange={(e) => setCreateInputValue(e.target.value)}
                  />
                  <Button
                    type='secondary'
                    onClick={() => {
                      console.log('Create'); // API
                      return 0;
                    }}
                  >
                    <PlusIcon className='w-5 h-5' />
                    Ajouter
                  </Button>
                  <Button
                    type='invert'
                    onClick={() => setCreateInput(null)}
                  >
                    <XMarkIcon className='w-5 h-5' />
                    Annuler
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-y-2 mt-5'>
            <Button
              type='secondary'
              className='w-full'
              onClick={() => {
                console.log('Modifier'); // API
                return 0;
              }}
            >
              <DocumentArrowDownIcon className='w-5 h-5' />
              Sauvegarder les modifications
            </Button>
            <Button
              type='invert'
              className='w-full'
              onClick={() => setModalState(null)}
            >
              <XMarkIcon className='w-5 h-5' />
              Annuler les modifications
            </Button>
          </div>
        </UpdateUserModal>
      )}
      <div className='bg-black-25 rounded-lg shadow border-2 border-black-100'>
        <div className='p-5'>
          <div className='flex flex-row px-2 text-black-900 font-medium gap-5'>
            <div className='w-3/6 flex flex-row items-center gap-1'>
              <UserIcon className='w-5 h-5' />
              <span>Prénom/Nom</span>
            </div>
            <div className='w-1/6 flex-row items-center gap-1 hidden md:flex'>
              <MapPinIcon className='w-5 h-5' />
              <span>Agence</span>
            </div>
            <div className='w-1/6 flex-row items-center gap-1 hidden lg:flex'>
              <UserGroupIcon className='w-5 h-5' />
              <span>Equipe</span>
            </div>
            <div className='w-full max-w-48'>
              <Input
                type='text'
                placeholder='Rechercher'
                id='search'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
        </div>
        <hr className='border-black-200' />
        <div className='p-5'>
          {filteredData.slice(0, parseInt(length.text)).map((item, index) => (
            <div key={index} className='flex flex-row hover:bg-black-100 rounded-lg
            font-regular text-black-900 px-2 py-1 cursor-pointer items-center gap-5'>
              <div className='w-3/6 truncate'>
                <span>{item.prenom} {item.nom}</span>
              </div>
              <div className='w-1/6 truncate hidden md:flex'>
                <span>{item.agence}</span>
              </div>
              <div className='w-1/6 truncate hidden lg:flex'>
                <span>{item.equipe}</span>
              </div>
              <div className='w-full max-w-48 flex flex-row gap-2'>
                <button className='text-black-900 cursor-pointer p-1 hover:bg-black-300
                w-8 h-8 rounded-lg transition-all duration-100 outline-none z-10
                bg-black-200'>
                  <UserIcon className='w-6 h-6' />
                </button>
                <PopHover
                  values={[
                    {
                      name: 'Modifier',
                      icon: <PencilIcon className='w-5 h-5' />,
                      colors: {
                        success: true
                      },
                      onClick: async () => {
                        setUpdatingUser(item);
                        setModalState('update');
                        return 1;
                      }
                    },
                    {
                      name: 'Supprimer',
                      icon: <TrashIcon className='w-5 h-5' />,
                      colors: {
                        danger: true
                      },
                      onClick: async () => {
                        console.log('Supprimer'); // API
                        return 0;
                      }
                    }
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
        <div className='px-5 mb-5'>
          <Button type='invert' className='w-full' onClick={() => {
            const newUser: Person = {
              nom: '',
              prenom: '',
              agence: '',
              equipe: '',
              poste: ''
            };
            setUpdatingUser(newUser);
            setModalState('create');
          }}>
            <DocumentPlusIcon className='w-5 h-5' />
            Créer un utilisateur
          </Button>
        </div>
        <hr className='border-black-200' />
        <div className='p-5'>
          <Dropdown
            title='Nombre de résultats'
            values={[
              { id: 1, text: '10' },
              { id: 2, text: '25' },
              { id: 3, text: '50' },
              { id: 4, text: '100' }
            ]}
            value={length}
            onChange={(e) => setLength(e)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
