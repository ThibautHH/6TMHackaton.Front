import React, { FunctionComponent, useState } from 'react';
import { AuthUser } from '../utils';
import Layout from './Layout';
import { User } from '../utils/types';
import data from './data.json';
import PopHover from '../components/PopHover';
import {
  MapPinIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/24/solid';
import { Dropdown, Input } from '../components';

const Admin: FunctionComponent = () => {
  const authUser: User | null = AuthUser();
  const [input, setInput] = useState<string>('');
  const [length, setLength] = useState<{ id: number, text: string }>({
    id: 1, text: '10'
  });
  const [filteredData, setFilteredData] = useState(data);

  React.useEffect(() => {
    if (input === '')
      setFilteredData(data);
    else
      setFilteredData(data
        .filter((item) =>
          item.nom.toLowerCase().includes(input.toLowerCase()) ||
          item.prenom.toLowerCase().includes(input.toLowerCase())
        )
      );
  }, [input, length]);

  return (
    <Layout>
      <div className='bg-black-25 rounded-lg shadow border-2 border-black-100'>
        <div className='p-5'>
          <div className='flex flex-row px-2 text-black-900 font-medium'>
            <div className='w-1/6 flex flex-row items-center gap-1'>
              <UserIcon className='w-5 h-5' />
              <span>Nom</span>
            </div>
            <div className='w-1/6 flex flex-row items-center gap-1'>
              <UserIcon className='w-5 h-5' />
              <span>Prénom</span>
            </div>
            <div className='w-1/6 flex flex-row items-center gap-1'>
              <MapPinIcon className='w-5 h-5' />
              <span>Agence</span>
            </div>
            <div className='w-1/6 flex flex-row items-center gap-1'>
              <UserGroupIcon className='w-5 h-5' />
              <span>Equipe</span>
            </div>
            <div className='w-1/6'>
              <Input
                type='text'
                placeholder='Rechercher'
                id='search'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
        </div>
        <hr className='border-black-200' />
        <div className='p-5'>
          {filteredData.slice(0, parseInt(length.text)).map((item, index) => (
            <div key={index} className='flex flex-row hover:bg-black-100 rounded-lg
            font-regular text-black-900 px-2 py-1 cursor-pointer items-center'>
              <div className='w-1/6 truncate'>
                <span>{item.nom}</span>
              </div>
              <div className='w-1/6 truncate'>
                <span>{item.prenom}</span>
              </div>
              <div className='w-1/6 truncate'>
                <span>{item.agence}</span>
              </div>
              <div className='w-1/6 truncate'>
                <span>{item.equipe}</span>
              </div>
              <div className='w-1/6'>
                <PopHover
                  values={[
                    {
                      name: 'Modifier',
                      icon: <PencilIcon className='w-5 h-5' />,
                      colors: {
                        success: true
                      },
                      onClick: async () => {
                        console.log('Modifier');
                        return 1;
                      }
                    },
                    {
                      name: 'Supprimer',
                      icon: <TrashIcon className='w-5 h-5' />,
                      colors: {
                        danger: true
                      },
                      onClick: async () => {
                        console.log('Supprimer');
                        return 0;
                      }
                    }
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
        <hr className='border-black-200' />
        <div className='p-5'>
          <Dropdown
            title='Nombre de résultats'
            values={[
              {
                id: 1,
                text: '10'
              },
              {
                id: 2,
                text: '25'
              },
              {
                id: 3,
                text: '50'
              },
              {
                id: 4,
                text: '100'
              }
            ]}
            value={length}
            onChange={(e) => setLength(e)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
