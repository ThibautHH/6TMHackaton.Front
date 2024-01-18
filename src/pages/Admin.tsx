import React, { FunctionComponent, useEffect, useState } from 'react';
import Layout from './Layout';
import { Employee, Premise, Team } from '../utils/types';
import PopHover from '../components/PopHover';
import {
  ComputerDesktopIcon,
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
  Alert,
  Button,
  DeleteUserModal,
  Dropdown,
  Input,
  UpdateUserModal
} from '../components';
import {
  createEmployee,
  createPremise,
  createTeam,
  deleteEmployee,
  getEmployees,
  getPremises,
  getTeams,
  updateEmployee
} from '../utils/api';
import { AuthUser } from '../utils';
import { useNavigate } from 'react-router-dom';

interface Values {
  id: number,
  text: string,
  disabled?: boolean,
  _id?: string,
  premise?: string
}

const Admin: FunctionComponent = () => {
  const [input, setInput] = useState<string>('');
  const [length, setLength] = useState<{ id: number, text: string }>({
    id: 1, text: '10'
  });
  const [data, setData] = useState<Employee[]>([]);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [modalState, setModalState] = useState<'update' | 'create' | 'delete' | null>(
    null);
  const [updatingUser, setUpdatingUser] = useState<Employee | null>(null);
  const [createInput, setCreateInput] = useState<'agence' | 'equipe' |
  'poste' | null>(null);
  const [createInputValue, setCreateInputValue] = useState<string>('');
  const [createListValue, setCreateListValue] = useState<Values | null>(null);
  const [agencesValues, setAgencesValues] = useState<Values[]>([]);
  const [teamsValues, setTeamsValues] = useState<Values[]>([]);
  const [jobsValues, setJobsValues] = useState<{
    id: number, text: string
  }[]>([]);
  const [premises, setPremises] = useState<Premise[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const user = AuthUser();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({text: '', type: '', title: ''});

  const handleAlert = (text: string, type: string, title: string) => {
    setAlert({text: text, type: type, title: title});
    setTimeout(() => {
      setAlert({text: '', type: '', title: ''});
    }, 5000);
  };

  useEffect(() => {
    const fetchPremises = async () => {
      const response = await getPremises();
      if (response.status !== 200)
        return;
      const premises: Premise[] = response.data['hydra:member'];
      setPremises(premises);
      setAgencesValues(premises.map((premise, id) => ({
        id: id + 1,
        text: premise.city,
        _id: premise['@id'] as string
      })));
    };
    const fetchTeams = async () => {
      const response = await getTeams();
      if (response.status !== 200)
        return;
      const teams: Team[] = response.data['hydra:member'];
      setTeams(teams);
      setTeamsValues(teams.map((team, id) => ({
        id: id + 1,
        text: team.name,
        _id: team['@id'] as string,
        premise: team.premise
      })));
    };
    const fetchJobs = async () => {
      const response = await getEmployees();
      if (response.status !== 200)
        return;
      const employees: Employee[] = response.data['hydra:member'];
      setJobsValues(employees.reduce((unique, employee, id) => {
        const positionExists = unique.some((job) => job.text === employee.position);
        if (!positionExists) {
          unique.push({
            id: id + 1,
            text: employee.position
          });
        }
        return unique;
      }, [] as { id: number, text: string }[]));
    };
    fetchTeams();
    fetchPremises();
    fetchJobs();
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
            .find((team) => team['@id'] === employee.team))
      }));
      setData(employees);
      setFilteredData(employees);
    };
    if (teamsValues.length > 0)
      fetchEmployees();
  }, [teamsValues]);

  useEffect(() => {
    if (input === '')
      setFilteredData(data);
    else
      setFilteredData(data
        .filter((item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.firstName.toLowerCase().includes(input.toLowerCase())
        )
      );
  }, [input, length, data]);

  return (
    <Layout>
      <div className='relative w-full p-5 h-full'>
        {alert.text !== '' && (
          <Alert
            title={alert.title}
            type={alert.type}
            message={alert.text}
            className='absolute bottom-0 z-[1000] w-full'
          />
        )}
      </div>
      {modalState === 'delete' && (
        <DeleteUserModal
          title='Supprimer un utilisateur'
          close={() => setModalState(null)}
          subtitle='Êtes-vous sûr de vouloir supprimer cet utilisateur ?'
        >
          <div className='flex flex-col gap-y-5 text-left'>
            <div className='flex flex-col gap-y-2 mt-5'>
              <Button
                type='danger'
                className='w-full'
                onClick={async () => {
                  const response = await deleteEmployee(
                    updatingUser?.id, user?.token
                  );
                  if (response.status === 204) {
                    setModalState(null);
                    window.location.reload();
                  } else {
                    handleAlert(
                      response.data.message, 'alert', 'Une erreur est survenue'
                    );
                  }
                }}
              >
                <TrashIcon className='w-5 h-5' />
                Supprimer l'employé
              </Button>
              <Button
                type='invert'
                className='w-full'
                onClick={() => setModalState(null)}
              >
                <XMarkIcon className='w-5 h-5' />
                Annuler la suppression
              </Button>
            </div>
          </div>
        </DeleteUserModal>
      )}
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
              value={updatingUser.name}
              onChange={(e) => {
                if (updatingUser)
                  setUpdatingUser({
                    ...updatingUser,
                    name: e.target.value
                  });
              }}
            />
            <Input
              type='text'
              required
              placeholder='Prénom'
              id='prenom'
              title='Prénom'
              value={updatingUser.firstName}
              onChange={(e) => {
                if (updatingUser)
                  setUpdatingUser({
                    ...updatingUser,
                    firstName: e.target.value
                  });
              }}
            />
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Agence'
                required
                values={agencesValues}
                value={(agencesValues
                  .find((item) => item._id === updatingUser.premise?.['@id']))}
                addValue={() => setCreateInput('agence')}
                onChange={(e) => {
                  setUpdatingUser({
                    ...updatingUser,
                    premise: premises.find((premise) => premise['@id'] === e._id)
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
                    disabled={!createInputValue}
                    onClick={async () => {
                      const newAgence: Premise = {
                        city: createInputValue
                      };
                      const response = await createPremise(newAgence, user?.token);
                      if (response.status === 201) {
                        setCreateInputValue('');
                        setCreateInput(null);
                        setAgencesValues([
                          ...agencesValues,
                          {
                            id: agencesValues.length + 1,
                            text: createInputValue,
                            _id: response.data['@id']
                          }
                        ]);
                      } else {
                        handleAlert(
                          response.data.message, 'alert', 'Une erreur est survenue'
                        );
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
                value={teamsValues.find((item) => item._id === updatingUser.team)}
                addValue={() => setCreateInput('equipe')}
                onChange={(e) => {
                  setUpdatingUser({
                    ...updatingUser,
                    team: e._id as string
                  });
                }}
              />
              {createInput === 'equipe' && (
                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex flex-row gap-2 w-full justify-between'>
                    <Input
                      type='text'
                      required
                      placeholder="Nom de l'équipe"
                      title="Nom de l'équipe"
                      id='equipe'
                      value={createInputValue}
                      onChange={(e) => setCreateInputValue(e.target.value)}
                    />
                    <Dropdown
                      title='Agence'
                      required
                      values={agencesValues}
                      value={createListValue}
                      onChange={(e) => {
                        setCreateListValue(e as {
                          id: number, text: string, _id: string
                        });
                      }}
                    />
                  </div>
                  <div className='flex flex-row gap-2'>
                    <Button
                      type='secondary'
                      disabled={!createInputValue || !createListValue}
                      onClick={async () => {
                        if (!createListValue)
                          return;
                        const newTeam: Team = {
                          name: createInputValue,
                          premise: createListValue?._id as string
                        };
                        const response = await createTeam(newTeam, user?.token);
                        if (response.status === 201) {
                          setCreateInputValue('');
                          setCreateInput(null);
                          setTeamsValues([
                            ...teamsValues,
                            {
                              id: teamsValues.length + 1,
                              text: createInputValue,
                              _id: response.data['@id']
                            }
                          ]);
                        } else {
                          handleAlert(
                            response.data.message, 'alert', 'Une erreur est survenue'
                          );
                        }
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
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Poste'
                required
                values={jobsValues}
                value={jobsValues.find((item) => item.text === updatingUser.position)}
                addValue={() => setCreateInput('poste')}
                onChange={(e) => {
                  if (updatingUser)
                    setUpdatingUser({
                      ...updatingUser,
                      position: e.text
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
                    onChange={(e) => {
                      setCreateInputValue(e.target.value);
                    }}
                  />
                  <Button
                    type='secondary'
                    disabled={!createInputValue}
                    onClick={() => {
                      setUpdatingUser({
                        ...updatingUser,
                        position: createInputValue
                      });
                      setJobsValues([
                        ...jobsValues,
                        {
                          id: jobsValues.length + 1,
                          text: createInputValue
                        }
                      ]);
                      setCreateInput(null);
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
                disabled={!updatingUser.name || !updatingUser.firstName ||
                !updatingUser.team || !updatingUser.position}
                onClick={async () => {
                  const newUser: Employee = {
                    name: updatingUser.name,
                    firstName: updatingUser.firstName,
                    team: updatingUser.team as string,
                    position: updatingUser.position
                  };
                  const response = await createEmployee(newUser, user?.token);
                  console.info(response);
                  if (response.status === 201) {
                    setModalState(null);
                  } else {
                    handleAlert(
                      response.data.message, 'alert', 'Une erreur est survenue'
                    );
                  }
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
              value={updatingUser.name}
              title='Nom'
              onChange={(e) => {
                if (updatingUser)
                  setUpdatingUser({
                    ...updatingUser,
                    name: e.target.value
                  });
              }}
            />
            <Input
              type='text'
              required
              placeholder='Prénom'
              id='prenom'
              value={updatingUser.firstName}
              title='Prénom'
              onChange={(e) => {
                if (updatingUser)
                  setUpdatingUser({
                    ...updatingUser,
                    firstName: e.target.value
                  });
              }}
            />
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Agence'
                required
                values={agencesValues}
                value={(agencesValues
                  .find((item) => item._id === updatingUser.premise?.['@id']))}
                addValue={() => setCreateInput('agence')}
                onChange={(e) => {
                  setUpdatingUser({
                    ...updatingUser,
                    premise: premises.find((premise) => premise['@id'] === e._id)
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
                    disabled={!createInputValue}
                    onClick={async () => {
                      const newAgence: Premise = {
                        city: createInputValue
                      };
                      const response = await createPremise(newAgence, user?.token);
                      if (response.status === 201) {
                        setCreateInputValue('');
                        setCreateInput(null);
                        setAgencesValues([
                          ...agencesValues,
                          {
                            id: agencesValues.length + 1,
                            text: createInputValue,
                            _id: response.data['@id']
                          }
                        ]);
                      } else {
                        handleAlert(
                          response.data.message, 'alert', 'Une erreur est survenue'
                        );
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
                value={teamsValues.find((item) => item._id === updatingUser.team)}
                addValue={() => setCreateInput('equipe')}
                onChange={(e) => {
                  setUpdatingUser({
                    ...updatingUser,
                    team: e._id as string
                  });
                }}
              />
              {createInput === 'equipe' && (
                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex flex-row gap-2 w-full justify-between'>
                    <Input
                      type='text'
                      required
                      placeholder="Nom de l'équipe"
                      title="Nom de l'équipe"
                      id='equipe'
                      value={createInputValue}
                      onChange={(e) => setCreateInputValue(e.target.value)}
                    />
                    <Dropdown
                      title='Agence'
                      required
                      values={agencesValues}
                      value={createListValue}
                      onChange={(e) => {
                        setCreateListValue(e as {
                          id: number, text: string, _id: string
                        });
                      }}
                    />
                  </div>
                  <div className='flex flex-row gap-2'>
                    <Button
                      type='secondary'
                      disabled={!createInputValue || !createListValue}
                      onClick={() => {
                        setUpdatingUser({
                          ...updatingUser,
                          team: createInputValue
                        });
                        setTeamsValues([
                          ...teamsValues,
                          {
                            id: teamsValues.length + 1,
                            text: createInputValue
                          }
                        ]);
                        setCreateInput(null);
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
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2 items-end w-full'>
              <Dropdown
                title='Poste'
                required
                values={jobsValues}
                value={jobsValues.find((item) => item.text === updatingUser.position)}
                addValue={() => setCreateInput('poste')}
                onChange={(e) => {
                  if (updatingUser)
                    setUpdatingUser({
                      ...updatingUser,
                      position: e.text
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
                    disabled={!createInputValue}
                    onClick={() => {
                      setUpdatingUser({
                        ...updatingUser,
                        position: createInputValue
                      });
                      setJobsValues([
                        ...jobsValues,
                        {
                          id: jobsValues.length + 1,
                          text: createInputValue
                        }
                      ]);
                      setCreateInput(null);
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
              disabled={!updatingUser.name || !updatingUser.firstName ||
              !updatingUser.team || !updatingUser.position}
              onClick={async () => {
                const updatedUser: Employee = {
                  name: updatingUser.name,
                  firstName: updatingUser.firstName,
                  team: updatingUser.team as string,
                  position: updatingUser.position,
                  id: updatingUser.id
                };
                const response = await updateEmployee(
                  updatedUser, updatedUser.id, user?.token
                );
                console.info(response);
                if (response.status === 200) {
                  setModalState(null);
                  window.location.reload();
                } else {
                  handleAlert(
                    response.data.message, 'alert', 'Une erreur est survenue'
                  );
                }
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
            <div className='w-1/6 flex-row items-center gap-1 hidden xl:flex'>
              <ComputerDesktopIcon className='w-5 h-5' />
              <span>Poste</span>
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
            font-regular text-black-900 px-2 py-1 items-center gap-5'>
              <div className='w-3/6 truncate'>
                <span>{item.firstName} {item.name}</span>
              </div>
              <div className='w-1/6 truncate hidden md:flex'>
                <span>{premises.find((premise) => premise['@id'] === teams
                  .find((team) => team['@id'] === item.team)?.premise)?.city}</span>
              </div>
              <div className='w-1/6 truncate hidden lg:flex'>
                <span>{teams.find((team) => team['@id'] === item.team)?.name}</span>
              </div>
              <div className='w-1/6 truncate hidden xl:flex'>
                <span>{item.position}</span>
              </div>
              <div className='w-full max-w-48 flex flex-row gap-2'>
                <button className='text-black-900 cursor-pointer p-1 hover:bg-black-300
                w-8 h-8 rounded-lg transition-all duration-100 outline-none z-10
                bg-black-200' onClick={() => {
                  navigate(`/list/${item.id}`);
                }}>
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
                        item.premise = premises
                          .find((premise) => premise['@id'] === teams
                            .find((team) => team['@id'] === item.team)?.premise);
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
                        item.premise = premises
                          .find((premise) => premise['@id'] === teams
                            .find((team) => team['@id'] === item.team)?.premise);
                        setUpdatingUser(item);
                        setModalState('delete');
                        return 1;
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
            const newUser: Employee = {
              name: '',
              firstName: '',
              premise: {
                city: ''
              },
              team: '',
              position: ''
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
