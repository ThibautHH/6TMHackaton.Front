import React, { FunctionComponent, useEffect, useState } from 'react';
import PersonCard from '../components/PersonCard';
import data from './data.json';
import Layout from './Layout';
import { Filter } from '../components';

const agencesValues = [
  { id: 1, name: 'Rennes' },
  { id: 2, name: 'Paris' }
];

const List: FunctionComponent = () => {
  const [input, setInput] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [agences, setAgences] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    setFilteredData(
      data.filter((person) =>
        person.nom.toLowerCase().includes(input.toLowerCase()) ||
        person.prenom.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 12)
    );
  }, [input]);

  return (
    <Layout>
      <div className='flex flex-col md:flex-row'>
        <Filter input={input} setInput={setInput}
          agences={agences}
          setAgences={setAgences}
          agencesValues={agencesValues}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-5'>
          {filteredData.map((person, index) => (
            <PersonCard key={index} person={person} id={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default List;
