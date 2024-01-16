import React, { useEffect, useState } from 'react';
import logoBlack from '../assets/logo-6tm-black.png';
import logoWhite from '../assets/logo-6tm-white.png';
import Button from './Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-between p-5 w-full z-50 border border-s-0 fixed
      transition-background duration-500 ${isScrolled ? 'bg-white' : 'bg-black-500'}`}>
      <img
        className='w-28 ml-60'
        src={isScrolled ? logoBlack : logoWhite}
        alt='logo'/>
      <div className="flex items-center">
        <a
          href='link-trombi'
          className={`block mx-4 transition-opacity hover:opacity-70 ${isScrolled ?
            'text-black-500' : 'text-white'}`}>TROMBISCOPE</a>
        <a
          href='https://www.6tm.com/vos-objectifs-digitaux/'
          className={`block mx-4 transition-opacity hover:opacity-70 ${isScrolled ?
            'text-black-500' : 'text-white'}`}>VOS OBJECTIFS</a>
        <a
          href='https://www.6tm.com/#'
          className={`block mx-4 transition-opacity hover:opacity-70 ${isScrolled ?
            'text-black-500' : 'text-white'}`}>NOS EXPERTISES</a>
        <a
          href='https://www.6tm.com/nos-solutions-digitales/'
          className={`block mx-4 transition-opacity hover:opacity-70 ${isScrolled ?
            'text-black-500' : 'text-white'}`}>NOS SOLUTIONS</a>
        <a
          href='https://www.6tm.com/nos-realisations/'
          className={`block mx-4 transition-opacity hover:opacity-70 ${isScrolled ?
            'text-black-500' : 'text-white'}`}>NOS RÉALISATIONS</a>
        <Button type='secondary' link='https://www.6tm.com/nous-contacter'>
          NOUS CONTACTER</Button>
      </div>
    </div>
  );
};

export default Header;
