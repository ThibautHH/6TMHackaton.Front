import React, { FunctionComponent, useEffect, useRef } from 'react';
import {
  PencilSquareIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

interface UpdateUserModalProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  close?: () => void;
}

const UpdateUserModal: FunctionComponent<UpdateUserModalProps> = ({
  children, title, subtitle, close
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node))
      if (close)
        close();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0
      bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm z-50'/>
      <div className='fixed left-0 right-0 top-0 z-50 p-4 animate-fade-in transition-all
      duration-300 w-full h-full flex justify-center'>
        <div className='relative w-fit min-w-0 sm:min-w-[600px] max-w-lg
        max-h-full m-auto' ref={ref}>
          <div className='relative bg-black-25 rounded-lg shadow border-2
          border-black-100 pb-6 px-6 pt-4 text-center flex flex-col items-center'>
            <div className='flex flex-row justify-end items-center w-full h-fit'>
              <div className='flex flex-row w-full items-center'>
                <PencilSquareIcon className='w-6 h-6 mr-2'/>
                <p className='text-lg font-regular text-black-900'>
                  {title}
                </p>
              </div>
              {close && (
                <div className='flex flex-row justify-end items-center h-fit'>
                  <button className='p-2 text-black-900 text-opacity-70
                  hover:text-opacity-100 transition-colors duration-300 rounded-lg'
                  onClick={() => close()}>
                    <XMarkIcon className='w-6 h-6'/>
                  </button>
                </div>
              )}
            </div>
            <hr className='w-full border-secondary-450 my-4'/>
            {subtitle && (
              <p className='mb-10 text-lg font-normal text-black-700 w-full
              break-words'>
                {subtitle}
              </p>
            )}
            <div className='w-full'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserModal;
