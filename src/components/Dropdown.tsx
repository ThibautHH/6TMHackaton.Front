import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, FunctionComponent } from 'react';
import {
  ChevronUpDownIcon,
  CheckIcon,
  PlusIcon
} from '@heroicons/react/24/solid';

interface Values {
  id: number,
  text: string,
  disabled?: boolean,
  _id?: string
}

interface DropdownProps {
  value?: Values | null,
  // eslint-disable-next-line no-unused-vars
  onChange: (value: Values) => void,
  values: Values[],
  title?: string,
  required?: boolean,
  disabled?: boolean,
  addValue?: () => void
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  value, onChange, values, title, required, disabled, addValue
}) => {
  return (
    <div className={`w-full relative ${disabled ? 'opacity-50' : ''}`}>
      {title && (
        <label className='block mb-2 text-sm font-medium text-black-900'>
          {title}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      <Listbox
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <Listbox.Button className='text-sm rounded-lg block w-full p-2.5
        bg-black-100 border-black-200 placeholder-black-400 text-black-900
        focus:ring-secondary-500 outline-none focus:border-secondary-500
        disabled:opacity-50 border-2 text-left min-h-11'>
          {value?.text ? (
            <span className='block truncate'>{value.text}</span>
          ) : (
            <span className='block truncate text-black-400'>
              Sélectionner une valeur
            </span>
          )}
          <span className='pointer-events-none absolute inset-y-0 right-0 flex
          items-center pr-2'>
            <ChevronUpDownIcon
              className='h-5 w-5 absolute right-2 top-10'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 overflow-auto
              rounded-md bg-black-100 border-black-200 p-1 text-base shadow-lg
              focus:outline-none sm:text-sm z-10 w-full border-2'>
            {values.map((e) => (
              <Listbox.Option
                key={e.id} value={e} disabled={e.disabled}
                className={({ active }) =>
                  `relative cursor-pointer select-none pr-4 font-medium
                text-black-900 py-2 pl-3 transition-colors rounded-md
                  ${active ? 'bg-black-200' : ''}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className='block truncate pr-5'>
                      {e.text}
                    </span>
                    {selected && (
                      <CheckIcon className='w-5 h-5 absolute right-2 top-2.5' />
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
            {addValue && (
              <Listbox.Option
                key={-1} value={-1}
                className={({ active }) =>
                  `relative cursor-pointer select-none pr-4 font-medium
                text-black-900 py-2 pl-3 transition-colors rounded-md
                  ${active ? 'bg-black-200' : ''}`
                }
                onClick={() => addValue()}
              >
                <span className='truncate pr-5 flex flex-row items-center'>
                  <PlusIcon className='w-5 h-5 mr-2 inline-block' />
                  Ajouter une valeur
                </span>
              </Listbox.Option>
            )}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default Dropdown;
