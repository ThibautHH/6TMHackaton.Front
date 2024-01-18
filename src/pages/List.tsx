import React, { FunctionComponent, useEffect, useState } from 'react';
import PersonCard from '../components/PersonCard';
import data from './data.json';
import Layout from './Layout';
import { Filter } from '../components';
import { getEmployees, getPremises, getTeams } from '../utils/api';
import { Employee, Premise, Team } from '../utils/types';

interface Values {
  id: number,
  name: string,
  disabled?: boolean,
  _id?: string
}

const List: FunctionComponent = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState<Employee[]>([]);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [premises, setPremises] = useState<Premise[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [agencesValues, setAgencesValues] = useState<Values[]>([]);
  const [teamsValues, setTeamsValues] = useState<Values[]>([]);
  const [jobsValues, setJobsValues] = useState<Values[]>([]);
  const [filteredAgences, setfilteredAgences] = useState<Values[]>([]);
  const [filteredTeams, setfilteredTeams] = useState<Values[]>([]);
  const [filteredJobs, setfilteredJobs] = useState<Values[]>([]);

  useEffect(() => {
    const fetchPremises = async () => {
      const response = await getPremises();
      if (response.status !== 200)
        return;
      const premises: Premise[] = response.data['hydra:member'];
      setPremises(premises);
      setAgencesValues(premises.map((premise, id) => ({
        id: id + 1,
        name: premise.city,
        _id: premise['@id'] as string
      })));
    };
    const fetchTeams = async () => {
      const response = await getTeams();
      if (response.status !== 200)
        return;
      const teams: Team[] = response.data['hydra:member'];
      setTeams(teams);
      setTeamsValues(teams.map((team, id) => ({
        id: id + 1,
        name: team.name,
        _id: team['@id'] as string,
        premise: team.premise
      })));
    };
    const fetchJobs = async () => {
      const response = await getEmployees();
      if (response.status !== 200)
        return;
      const employees: Employee[] = response.data['hydra:member'];
      setJobsValues(employees.reduce((unique, employee, id) => {
        const positionExists = unique.some((job) => job.name === employee.position);
        if (!positionExists) {
          unique.push({
            id: id + 1,
            name: employee.position
          });
        }
        return unique;
      }, [] as { id: number, name: string }[]));
    };
    fetchTeams();
    fetchPremises();
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployees();
      const responsePremise = await getPremises();
      const responseTeam = await getTeams();
      if (response.status !== 200 || responsePremise.status !== 200
        || responseTeam.status !== 200)
        return;
      let employees: Employee[] = response.data['hydra:member'];
      employees = employees.map((employee) => ({
        ...employee,
        premise: premises
          .find((premise) => premise['@id'] === teams
            .find((team) => team['@id'] === employee.team)?.premise)
      }));
      setData(employees);
      setFilteredData(employees);
    };
    if (teamsValues.length > 0)
      fetchEmployees();
  }, [teamsValues]);

  useEffect(() => {
    setFilteredData(
      data
        .filter((employee) =>
          employee.name.toLowerCase().includes(input.toLowerCase()) ||
          employee.firstName.toLowerCase().includes(input.toLowerCase())
        )
        .filter((employee) =>
          filteredAgences.length === 0 ||
          filteredAgences.some((agence) => agence._id === employee.premise?.['@id'])
        )
        .filter((employee) =>
          filteredTeams.length === 0 ||
          filteredTeams.some((team) => team._id === employee.team)
        )
        .filter((employee) =>
          filteredJobs.length === 0 ||
          filteredJobs.some((job) => job.name === employee.position)
        )
    );
    const fetchData = async () => {
      const data = await getEmployees();
      console.info('data', data);
    };
    fetchData();
  }, [input, filteredAgences, filteredTeams, filteredJobs]);

  return (
    <Layout>
      <div className='flex flex-col md:flex-row'>
        <Filter input={input} setInput={setInput}
          agences={filteredAgences}
          setAgences={setfilteredAgences}
          agencesValues={agencesValues}
          equipes={filteredTeams}
          setEquipes={setfilteredTeams}
          equipesValues={teamsValues}
          jobs={filteredJobs}
          setJobs={setfilteredJobs}
          jobsValues={jobsValues}
        />
        <div className='gap-5 mx-auto flex flex-col md:flex-row flex-wrap
        justify-between items-start'>
          {filteredData.map((employee, index) => (
            <PersonCard key={index} employee={employee} id={employee.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default List;
