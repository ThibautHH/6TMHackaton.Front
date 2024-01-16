import React from 'react';
import logo from '../assets/6tm_logo.jpeg';

const PersonCardPageSkeleton: React.FC = () => {

  return (
    <div className='relative group w-fit h-fit'>
      <div className='bg-secondary-500 pl-2 pb-2 rounded-lg absolute w-full
      h-full -left-3 -bottom-3 -z-10 transition-all'/>
      <div
        className='w-56 md:w-96 rounded-lg overflow-hidden transition-all
        z-40 relative h-full border-2 border-secondary-500 group-hover:scale-102'
      >
        <div className='bg-secondary-500 w-full h-full flex items-center animate-pulse'>
          <img src={logo} alt='6TM' className='w-full h-fit' />
        </div>
      </div>
    </div>
  );
};

export default PersonCardPageSkeleton;
