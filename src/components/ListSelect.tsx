import { Fragment, FunctionComponent } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ListSelectProps {
  selectedValues: { id: number, name: string }[];
  setSelectedValues: (values: { id: number, name: string }[]) => void;
  values: { id: number, name: string }[];
}

const ListSelect: FunctionComponent<ListSelectProps> = ({
  selectedValues, setSelectedValues, values
}) => {
  return (
    <div className='relative'>
      <Listbox value={selectedValues} onChange={setSelectedValues} multiple>
        <Listbox.Button className='relative border text-sm rounded-lg block w-full
          p-2.5 bg-black-100 border-black-200/50 placeholder-black-400 text-black-900
          focus:ring-secondary-500 outline-none focus:border-secondary-500
          disabled:opacity-50 h-11'>
          {selectedValues.map((value) => value.name).join(', ')}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 overflow-auto
              rounded-md bg-black-100 border-black-200/50 p-1 text-base shadow-lg
              focus:outline-none sm:text-sm z-10 w-full'>
            {values.map((value) => (
              <Listbox.Option key={value.id} value={value} className={({ active }) =>
                `relative cursor-pointer select-none pr-4 font-medium
                text-black-900 py-2 pl-3 transition-colors rounded-md
                ${active ? 'bg-black-200' : ''}`
              }>
                {({ selected }) => (
                  <>
                    <span className='block truncate'>
                      {value.name}
                      {selected && (
                        <CheckIcon
                          className='w-5 h-5 absolute right-2 top-2.5'
                        />
                      )}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default ListSelect;
