import axios from 'axios';
import { Employee } from '../../types';

async function putEmployee(id: string, data: Employee) {
  const config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/employees/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  const response = await axios.request(config)
    .then((response) => {
      return response.data.data;
    }).catch((error) => {
      return error.response;
    });
  return response;
}

export default putEmployee;
