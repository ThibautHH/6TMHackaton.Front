import React, { FC } from 'react';
import { ButtonProps } from '../utils/types';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';

const Button: FC<ButtonProps> = ({
  type, link, className, children, onClick, disabled, loading
}) => {
  const handleClick = (link: string | undefined) => {
    if (link) {
      window.open(link, '_blank');
    } else if (onClick)
      onClick();
  };

  let style = '';

  switch (type) {
  case 'primary':
    style += 'bg-primary hover:bg-secondary-500 shadow-sm px-10 \
    disabled:hover:text-secondary-500 text-secondary-500 hover:text-black-900 \
    border-primary hover:border-secondary-500 disabled:hover:bg-primary \
    border-2 disabled:border-primary';
    break;
  case 'secondary':
    style += 'bg-secondary-500 hover:bg-tertiary shadow-sm \
    text-black-900 hover:text-white disabled:hover:bg-secondary-500 border-2 \
    border-secondary-500 hover:disabled:text-black-900 px-10\
    disabled:border-secondary-500';
    break;
  case 'invert':
    style += 'bg-white hover:bg-secondary-500 shadow-sm disable:hover:border-black-900 \
    text-black-900 disabled:hover:bg-white border-2 px-10 \
    border-black-900 disabled:hover:text-black-900';
    break;
  case 'danger':
    style += 'bg-red-500 hover:bg-opacity-0 shadow-sm text-white \
    border-red-500 disabled:hover:bg-red-500 px-10 border-2 hover:text-red-500 \
    disabled:hover:text-white';
    break;
  case 'text':
    style += 'text-black-900 hover:-translate-y-2 disabled:hover:text-black-900';
    break;
  }
  return (
    <button className={`items-center text-base w-fit
    font-medium py-3 h-11 rounded-lg flex flex-row justify-center
    disabled:opacity-60 disabled:cursor-not-allowed min-h-10 ${style}
    transition duration-200 ease-in-out ${className} whitespace-nowrap truncate`}
    disabled={disabled || false}
    onClick={() => handleClick(link)}>
      {loading ? (
        <>
          <ArrowPathIcon className='animate-spin h-5 w-5 mr-3' />
          Chargement
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
