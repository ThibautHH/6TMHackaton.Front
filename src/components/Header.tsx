import React, { useEffect, useState } from 'react';
import logoBlack from '../assets/logo-6tm-black.png';
import logoWhite from '../assets/logo-6tm-white.png';
import Button from './Button';
import { Menu } from '@headlessui/react';
import {
  Bars4Icon
} from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <img
        className='w-28 h-full'
        src={isScrolled ? logoBlack : logoWhite}
        alt='logo'/>
      <div className="items-center hidden lg:flex font-regular">
        <a
          href='link-trombi'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>TROMBISCOPE</a>
        <a
          href='https://www.6tm.com/vos-objectifs-digitaux/'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>VOS OBJECTIFS</a>
        <a
          href='https://www.6tm.com/#'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>NOS EXPERTISES</a>
        <a
          href='https://www.6tm.com/nos-solutions-digitales/'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>NOS SOLUTIONS</a>
        <a
          href='https://www.6tm.com/nos-realisations/'
          className={`block mx-4 transition-opacity hover:opacity-70 text-sm
          ${isScrolled ? 'text-black-900' : 'text-white'}`}>NOS RÉALISATIONS</a>
        <Button type='invert' link='https://www.6tm.com/nous-contacter'>
          NOUS CONTACTER
        </Button>
      </div>
      <Menu as='div' className='relative inline-block lg:hidden text-left'>
        <Menu.Button>
          <Bars4Icon className='w-6 h-6 text-black-0' />
        </Menu.Button>
        <Menu.Items className='absolute right-0 w-64 mt-2 origin-top-right
        bg-black-0 gap-4 rounded-md shadow-lg p-4
        flex flex-col font-regular'>
          <Menu.Item>
            <a className='text-black-900 hover:opacity-80' href='#'>
              TROMBISCOPE
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
