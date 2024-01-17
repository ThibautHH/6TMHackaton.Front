import axios from 'axios';
import { Employee } from '../../types';

async function createEmployee(data: Employee, token: string | undefined) {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/employees`,
    headers: {
      'Content-Type': 'application/ld+json',
      'Authorization': `Bearer ${token}`
    },
    data: data
  };
  console.log(config);
  const response = await axios.request(config).then((response) => {
    console.log(response);
    return response;
  }).catch((error) => {
    console.log(error.response);
    return error.response;
  });
  return response;
}

export default createEmployee;
