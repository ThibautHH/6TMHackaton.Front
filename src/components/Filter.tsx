import React, { FunctionComponent } from 'react';
import Input from './Input';
import { MapPinIcon } from '@heroicons/react/24/solid';
import ListSelect from './ListSelect';

interface FilterProps {
  input: string;
  // eslint-disable-next-line no-unused-vars
  setInput: (input: string) => void;
  agences: { id: number, name: string }[];
  // eslint-disable-next-line no-unused-vars
  setAgences: (values: { id: number, name: string }[]) => void;
  agencesValues: { id: number, name: string }[];
}

const Filter: FunctionComponent<FilterProps> = ({
  input, setInput, agences, setAgences, agencesValues
}) => {
  return (
    <div className='h-fit mr-10 py-2 md:p-2'>
      <Input
        value={input}
        type='text'
        id='filter'
        className='w-full'
        placeholder='Filtrer par nom'
        title='Filtrer par nom'
        onChange={(e) => setInput(e.target.value)}
      />
      <label className='block mb-2 text-sm font-medium text-black-900 mt-5'>
        <MapPinIcon className='w-5 h-5 inline-block mr-1' />
        Agence
      </label>
      <ListSelect
        values={agencesValues}
        selectedValues={agences}
        setSelectedValues={setAgences}
      />
    </div>
  );
};

export default Filter;
