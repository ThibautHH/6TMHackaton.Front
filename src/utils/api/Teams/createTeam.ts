import axios from 'axios';
import { Team } from '../../types';

export async function createTeams(data: Team) {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/teams`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  const response = await axios.request(config).then((response) => {
    return response.data.data;
  }).catch((error) => {
    return error.response;
  });
  return response;
}
