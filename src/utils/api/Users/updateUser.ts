import axios from 'axios';

export async function updateUsers(id: string) {
  const config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/users/${id}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.request(config).then((response) => {
    return response.data.data;
  }).catch((error) => {
    return error.response;
  });
  return response;
}
