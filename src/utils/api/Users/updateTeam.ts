import axios from 'axios';
import Users from '../../types/Users';

export async function updateUsers(data: Users) {
  const config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/${data}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.request(config).then((response) => {
    return response.data.data;
  }).catch((error) => {
    return error.response;
  });
  return response as Users;
}
