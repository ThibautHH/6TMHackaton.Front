import axios from 'axios';
import { Team } from '../../types';

async function createTeam(data: Team, token: string | undefined) {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/teams`,
    headers: {
      'Content-Type': 'application/ld+json',
      Authorization: `Bearer ${token}`
    },
    data: data
  };
  const response = await axios.request(config).then((response) => {
    return response;
  }).catch((error) => {
    return error.response;
  });
  return response;
}

export default createTeam;
