import { Popover }  from '@headlessui/react';
import {
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid';
import React, { FunctionComponent, RefObject, useEffect, useRef, useState } from 'react';

const initializeState = (values: Values[]) => {
  return values.map(() => 0);
};

interface Values {
  name: string,
  icon: JSX.Element,
  separator?: boolean,
  closeDelay?: number,
  colors?: {
    danger?: boolean,
    success?: boolean
  },
  disabled?: boolean,
  hidden?: boolean,
  onClick: () => Promise<number>
}

interface PopHoverProps {
  values: Values[]
}

const PopHover: FunctionComponent<PopHoverProps> = ({ values }) => {
  const [state, setState] = useState(initializeState(values));
  const [open, setOpen] = useState(false);

  const handleClick = async (index: number) => {
    const newState = [...state];
    if (state[index] !== 0) {
      newState[index] = 0;
      setState(newState);
      return;
    }
    newState[index] = 1;
    setState(newState);
    const result = await values[index].onClick();

    setState((prevState) => {
      const newState = [...prevState];
      if (result === 0) {
        newState[index] = 2;
      } else {
        setTimeout(() => {
          setOpen(false);
        }, (values[index].closeDelay ?? 1000));
        newState[index] = 0;
      }
      return newState;
    });
  };

  const ref: RefObject<HTMLDivElement> = useRef(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <Popover className='relative' ref={ref}>
      <button className='text-black-900 cursor-pointer p-1 hover:bg-black-300
      rounded-lg transition-all duration-100 outline-none z-10 bg-black-200'
      onClick={() => setOpen(!open)}>
        <EllipsisHorizontalIcon className='w-6 h-6' />
      </button>
      {open && (
        <Popover.Panel static className='absolute mt-1 max-h-60 overflow-auto
        rounded-md bg-black-100 border-black-200 p-1 text-base shadow-lg
        focus:outline-none sm:text-sm z-10 w-full border-2'>
          {values.filter((value) => !value.hidden).map((value, index) => (
            <div key={index}>
              {value.separator && (
                <hr className='border-black-300 mb-1 mx-1' />
              )}
              <button key={index} onClick={() => handleClick(index)}
                disabled={state[index] === 1 || value.disabled || value.hidden}
                className={`relative cursor-pointer select-none pr-4 font-medium
                py-2 px-3 flex flex-row gap-2 items-center rounded-md
                hover:bg-black-200 w-full disabled:hover:bg-black-200
                disabled:cursor-not-allowed transition-colors disabled:opacity-50
                ${value.colors?.danger ? 'text-red-500' :
              value.colors?.success ? 'text-green-500' : 'text-white/80'} `}>
                {state[index] === 2 && (
                  <>
                    <ExclamationTriangleIcon className='w-5 h-5' />
                    <p className='whitespace-nowrap'>
                      Erreur
                    </p>
                  </>
                )}
                {state[index] === 1 && (
                  <ArrowPathIcon className='w-5 h-5 animate-spin mx-auto' />
                )}
                {state[index] === 0 && (
                  <div className='flex flex-row items-center gap-1'>
                    {value.icon}
                    <p className='whitespace-nowrap'>
                      {value.name}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </Popover.Panel>
      )}
    </Popover>
  );
};

export default PopHover;
