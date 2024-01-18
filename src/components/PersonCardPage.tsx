import React from 'react';
import { Employee } from '../utils/types/';
import logo from '../assets/6tm_logo.jpeg';

const PersonCardPage: React.FC<{person: Employee}> = ({ person }) => {

  return (
    <div className='relative group w-fit h-fit'>
      <div className='bg-secondary-500 pl-2 pb-2 rounded-lg absolute w-full
      h-full -left-3 -bottom-3 -z-10 transition-all'/>
      <div
        className='w-56 md:w-96 rounded-lg overflow-hidden transition-all
        z-40 relative h-full border-2 border-secondary-500 group-hover:scale-102'
      >
        {person.casualPicture && person.professionalPicture ? (
          <>
            <img
              src={person.professionalPicture}
              alt={person.name}
              className='group-hover:hidden flex'
            />
            <img
              src={person.casualPicture}
              alt={person.name}
              className='group-hover:flex hidden'
            />
          </>
        ) : (
          <div className='bg-secondary-500 w-full h-full flex items-center'>
            <img src={logo} alt='6TM' className='w-full h-fit' />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCardPage;
