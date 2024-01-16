import React, { FunctionComponent, useEffect, useState } from 'react';
import PersonCard from '../components/PersonCard';
import data from './data.json';
import Layout from './Layout';
import { Filter } from '../components';

const agencesValues: { id: number, name: string }[] = Array
  .from(new Set(data.map(employe => employe.agence)))
  .map((name, id) => ({ id: id + 1, name }));

const teamsValues: { id: number, name: string }[] = Array
  .from(new Set(data.map(employe => employe.equipe)))
  .map((name, id) => ({ id: id + 1, name }));

const jobsValues: { id: number, name: string }[] = Array
  .from(new Set(data.map(employe => employe.poste)))
  .map((name, id) => ({ id: id + 1, name }));

const List: FunctionComponent = () => {
  const [input, setInput] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [agences, setAgences] = useState<{ id: number, name: string }[]>(agencesValues);
  const [teams, setTeams] = useState<{ id: number, name: string }[]>([]);
  const [jobs, setJobs] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    setFilteredData(
      data
        .filter((person) =>
          person.nom.toLowerCase().includes(input.toLowerCase()) ||
          person.prenom.toLowerCase().includes(input.toLowerCase())
        )
        .filter((person) =>
          agences.length === 0 ||
          agences.some((agence) => agence.name === person.agence)
        )
        .filter((person) =>
          teams.length === 0 ||
          teams.some((team) => team.name === person.equipe)
        )
        .filter((person) =>
          jobs.length === 0 ||
          jobs.some((job) => job.name === person.poste)
        )
        .slice(0, 12)
    );
  }, [input, agences, teams, jobs]);

  return (
    <Layout>
      <div className='flex flex-col md:flex-row'>
        <Filter input={input} setInput={setInput}
          agences={agences} setAgences={setAgences} agencesValues={agencesValues}
          equipes={teams} setEquipes={setTeams} equipesValues={teamsValues}
          jobs={jobs} setJobs={setJobs} jobsValues={jobsValues}
        />
        <div className='gap-5 mx-auto flex flex-col md:flex-row flex-wrap
        justify-between'>
          {filteredData.map((person, index) => (
            <PersonCard key={index} person={person} id={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default List;
