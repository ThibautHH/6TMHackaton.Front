import React, { useEffect, useState } from 'react';
import logoBlack from '../assets/logo-6tm-black.svg';
import logoWhite from '../assets/logo-6tm-white.svg';
import Button from './Button';
import { Menu } from '@headlessui/react';

import {
  Bars4Icon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-between p-5 w-full z-50 border border-s-0 fixed
      transition-background duration-500 items-center px-10 xl:px-40
      ${isScrolled ? 'bg-white' : 'bg-black-900'}`}>
      <a onClick={() => navigate('/')}>
        <img
          className='w-60 h-full cursor-pointer'
          src={isScrolled ? logoBlack : logoWhite}
          alt='logo'/></a>
      <div className="items-center hidden lg:flex font-regular">
        <a
          onClick={() => navigate('/list')}
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          cursor-pointer ${isScrolled ? 'text-black-900' : 'text-white'}`}>
            TROMBINOSCOPE
        </a>
        <a
          href='https://www.6tm.com/vos-objectifs-digitaux/'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>
            VOS OBJECTIFS
        </a>
        <a
          href='https://www.6tm.com/#'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>
            NOS EXPERTISES
        </a>
        <a
          href='https://www.6tm.com/nos-solutions-digitales/'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>
            NOS SOLUTIONS
        </a>
        <a
          href='https://www.6tm.com/nos-realisations/'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>
            NOS RÉALISATIONS
        </a>
        <Button type='invert' link='https://www.6tm.com/nous-contacter'>
          NOUS CONTACTER
        </Button>
      </div>
      <Menu as='div' className='relative inline-block lg:hidden text-left'>
        <Menu.Button>
          <Bars4Icon className={`w-6 h-6
          ${isScrolled ? 'text-black-900' : 'text-black-25'}`} />
        </Menu.Button>
        <Menu.Items className='absolute right-0 w-64 mt-2 origin-top-right
        bg-black-0 gap-4 rounded-md shadow-lg p-4 flex flex-col font-regular'>
          <Menu.Item>
            <a className='text-black-900 hover:opacity-80' href='#'>
              TROMBINOSCOPE
            </a>
          </Menu.Item>
          <Menu.Item>
            <a className='text-black-900 hover:opacity-80' href='#'>
              VOS OBJECTIFS
            </a>
          </Menu.Item>
          <Menu.Item>
            <a className='text-black-900 hover:opacity-80' href='#'>
              NOS EXPERTISES
            </a>
          </Menu.Item>
          <Menu.Item>
            <a className='text-black-900 hover:opacity-80' href='#'>
              NOS SOLUTIONS
            </a>
          </Menu.Item>
          <Menu.Item>
            <a className='text-black-900 hover:opacity-80' href='#'>
              NOS RÉALISATIONS
            </a>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Header;
