import React, { useState } from 'react';
import {Person} from '../utils/types/';

const PersonCard: React.FC<{person: Person}> = ({ person }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className='w-52 border-2 border-black rounded-lg overflow-hidden'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={isHover ? person.photo_fun : person.photo_pro}
        alt={person.nom}
      />
    </div>
  );
};

export default PersonCard;
