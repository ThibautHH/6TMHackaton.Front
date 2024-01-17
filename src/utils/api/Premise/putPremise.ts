import axios from 'axios';
import { Premise } from '../../types';

export async function putPremise(id: string, data: Premise) {
  const config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/premises/${id}`,
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
