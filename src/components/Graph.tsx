/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Employee, Premise, Team } from '../utils/types';
import Chart from 'chart.js/auto';

interface GraphProps {
  data: Employee[];
  teamsValue: Team[];
  premisesValue: Premise[];
}

const Graph: FunctionComponent<GraphProps> = ({ data, teamsValue, premisesValue }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartRefBis = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const teams = data.map((employee) => employee.team);
      const uniqueTeams = teams.filter((team, index) => teams.indexOf(team) === index);
      const teamCountsArray = uniqueTeams.map((team) => ({
        team: teamsValue.find((t) => t['@id'] === team)?.name,
        count: teams.filter((t) => t === team).length
      }));

      const data_t = {
        labels: teamsValue.map((team) => team.name),
        datasets: [{
          label: 'Employés par équipes',
          data: teamCountsArray.map((teamCount) => teamCount.count),
          backgroundColor: [
            '#507579',
            '#2f4447',
            '#000000',
            '#717379',
            '#5a4a96',
            '#7e56d9',
            '#c4c1ff',
            '#94d8ef',
            '#c1edfa',
            '#cd6aa6',
            '#e1a9ca',
            '#91F9E5',
            '#76F7BF',
            '#5FDD9D',
            '#499167',
            '#7180AC'
          ],
          hoverOffset: 4
        }]
      };

      if ((chartRef.current as any).chart) {
        if (chartRef.current && (chartRef.current as any).chart) {
          (chartRef.current as any).chart.destroy();
        }
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        (chartRef.current as any).chart = new Chart(ctx, {
          type: 'pie',
          data: data_t
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (chartRefBis.current) {
      const teams = data.map((employee) => employee.team);
      const uniqueTeams = teams.filter((team, index) => teams.indexOf(team) === index);

      const premiseCountsArray = uniqueTeams.map((team) => {
        const premise = teamsValue.find((t) => t['@id'] === team)?.premise;
        const premiseName = premisesValue.find((p) => p['@id'] === premise)?.city;
        return {
          premise: premiseName,
          count: teams.filter((t) => t === team).length
        };
      });
      const reducedPremiseCounts = premiseCountsArray
        .reduce((acc, premiseCount) => {
          const premise = acc.find((p) => p.premise === premiseCount.premise);
          if (premise) {
            premise.count += premiseCount.count;
          } else {
            acc.push(premiseCount);
          }
          return acc;
        }, [] as { premise: string | undefined; count: number }[]);

      const data_b = {
        labels: reducedPremiseCounts.map((premise) => premise.premise),
        datasets: [{
          label: 'Employés par agences',
          data: reducedPremiseCounts.map((premiseCount) => premiseCount.count),
          backgroundColor: [
            '#507579',
            '#2f4447',
            '#000000',
            '#717379',
            '#5a4a96',
            '#7e56d9',
            '#c4c1ff',
            '#94d8ef',
            '#c1edfa',
            '#cd6aa6',
            '#e1a9ca',
            '#91F9E5',
            '#76F7BF',
            '#5FDD9D',
            '#499167',
            '#7180AC'
          ],
          hoverOffset: 4
        }]
      };

      if ((chartRefBis.current as any).chart) {
        if (chartRefBis.current && (chartRefBis.current as any).chart) {
          (chartRefBis.current as any).chart.destroy();
        }
      }

      const ctx = chartRefBis.current.getContext('2d');
      if (ctx) {
        (chartRefBis.current as any).chart = new Chart(ctx, {
          type: 'pie',
          data: data_b
        });
      }
    }
  }, [data]);

  return (
    <div className='flex flex-col items-center'>
      <canvas ref={chartRef}>
      </canvas>
      <canvas ref={chartRefBis}>
      </canvas>
    </div>
  );
};

export default Graph;
