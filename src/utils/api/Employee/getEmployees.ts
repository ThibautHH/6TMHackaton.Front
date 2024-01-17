import axios from 'axios';
import Employee from '../../types/Employee';

export async function getEmployees() {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.request(config)
    .then((response) => {
      return response.data.data;
    }).catch((error) => {
      return error.response;
    });
  return response;
}
