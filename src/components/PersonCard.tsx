import React from 'react';
import {Person} from '../utils/types/';

const PersonCard: React.FC<{person: Person}> = ({ person }) => {
  return (
    <div className='ml-5 '>
      {person.nom}
    </div>
  );
};

export default PersonCard;
