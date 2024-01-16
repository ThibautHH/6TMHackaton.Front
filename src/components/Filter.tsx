import React, { FunctionComponent } from 'react';
import Input from './Input';
import {
  ComputerDesktopIcon,
  MapPinIcon,
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/24/solid';
import ListSelect from './ListSelect';

interface FilterProps {
  input: string;
  // eslint-disable-next-line no-unused-vars
  setInput: (input: string) => void;
  agences: { id: number, name: string }[];
  // eslint-disable-next-line no-unused-vars
  setAgences: (values: { id: number, name: string }[]) => void;
  agencesValues: { id: number, name: string }[];
  equipes: { id: number, name: string }[];
  // eslint-disable-next-line no-unused-vars
  setEquipes: (values: { id: number, name: string }[]) => void;
  equipesValues: { id: number, name: string }[];
  jobs: { id: number, name: string }[];
  // eslint-disable-next-line no-unused-vars
  setJobs: (values: { id: number, name: string }[]) => void;
  jobsValues: { id: number, name: string }[];
}

const Filter: FunctionComponent<FilterProps> = ({
  input, setInput, agences, setAgences, agencesValues, equipes, setEquipes, equipesValues,
  jobs, setJobs, jobsValues
}) => {
  return (
    <div className='flex-shrink-0 h-fit mr-10 py-2 md:p-2 w-72'>
      <label className='block mb-2 text-sm font-medium text-black-900'>
        <UserIcon className='w-5 h-5 inline-block mr-1' />
        Nom/Prénom
      </label>
      <Input
        value={input}
        type='text'
        id='filter'
        className='w-full'
        placeholder='Filtrer par nom ou prénom'
        onChange={(e) => setInput(e.target.value)}
      />
      <label className='block mb-2 text-sm font-medium text-black-900 mt-5'>
        <MapPinIcon className='w-5 h-5 inline-block mr-1' />
        Agences
      </label>
      <ListSelect
        values={agencesValues}
        selectedValues={agences}
        setSelectedValues={setAgences}
      />
      <label className='block mb-2 text-sm font-medium text-black-900 mt-5'>
        <UserGroupIcon className='w-5 h-5 inline-block mr-1' />
        Équipes
      </label>
      <ListSelect
        values={equipesValues}
        selectedValues={equipes}
        setSelectedValues={setEquipes}
      />
      <label className='block mb-2 text-sm font-medium text-black-900 mt-5'>
        <ComputerDesktopIcon className='w-5 h-5 inline-block mr-1' />
        Postes
      </label>
      <ListSelect
        values={jobsValues}
        selectedValues={jobs}
        setSelectedValues={setJobs}
      />
    </div>
  );
};

export default Filter;
