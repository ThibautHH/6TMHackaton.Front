import React from 'react';
import {Person} from '../utils/types/';
import logo from '../assets/6tm_logo.jpeg';

const PersonCard: React.FC<{person: Person}> = ({ person }) => {

  return (
    <div className='relative group'>
      <div className='bg-secondary-500 pl-2 pb-2 rounded-lg absolute w-full
      h-full -left-2 -bottom-2 -z-10
      transition-all'/>
      <div
        className='w-52 rounded-lg overflow-hidden cursor-pointer transition-all
        z-40 relative h-full border-2 border-secondary-500 group-hover:scale-102'
      >
        {person.photo_fun && person.photo_pro ? (
          <>
            <img
              src={person.photo_pro}
              alt={person.nom}
              className='group-hover:hidden flex mb-5'
            />
            <img
              src={person.photo_fun}
              alt={person.nom}
              className='group-hover:flex hidden mb-5'
            />
          </>
        ) : (
          <div className='bg-secondary-500 w-full h-full flex items-center'>
            <img src={logo} alt='6TM' className='w-full h-fit' />
          </div>
        )}
        <div className='bg-white w-full text-black text-center
        font-medium h-fit p-2 absolute bottom-0'>
          <p className=''>{person.prenom}</p>
          <p className='text-xs'>{person.nom}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
