import React, { FunctionComponent } from 'react';
import Input from './Input';

interface FilterProps {
  input: string;
  // eslint-disable-next-line no-unused-vars
  setInput: (input: string) => void;
}

const Filter: FunctionComponent<FilterProps> = ({ input, setInput }) => {
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
    </div>
  );
};

export default Filter;
