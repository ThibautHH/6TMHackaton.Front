import axios from 'axios';
import Employee from '../../types/Employee';

export async function createEmployee(data: Employee) {
  const config = {
    method: 'post',
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
  return response;
}
