/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Employee } from '../utils/types';
import Chart from 'chart.js/auto';

interface GraphProps {
  data: Employee[];
}

const Graph: FunctionComponent<GraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const teams = data.map((employee) => employee.team);
      const uniqueTeams = teams.filter((team, index) => teams.indexOf(team) === index);
      const teamCountsArray = uniqueTeams.map((team) => ({
        team: team,
        count: teams.filter((t) => t === team).length
      }));

      const data_t = {
        labels: uniqueTeams,
        datasets: [{
          label: 'Team Counts',
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

  return (
    <div className='flex items-center w-[500px]'>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Graph;
