import axios from 'axios';

async function getTeams() {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/teams`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.request(config).then((response) => {
    return response;
  }).catch((error) => {
    return error.response;
  });
  return response;
}

export default getTeams;
