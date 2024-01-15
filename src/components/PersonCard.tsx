import React, { useState } from 'react';
import {Person} from '../utils/types/';

const PersonCard: React.FC<{person: Person}> = ({ person }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className='w-52 border-2 border-black rounded-lg overflow-hidden
      shadow-xl cursor-pointer'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {person.photo_fun && person.photo_pro ? (
        <>
          <img
            src={person.photo_pro}
            alt={person.nom}
            className={`${isHover ? 'hidden' : 'block'}`}
          />
          <img
            src={person.photo_fun}
            alt={person.nom}
            className={`${isHover ? 'block' : 'hidden'}`}
          />
        </>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default PersonCard;
