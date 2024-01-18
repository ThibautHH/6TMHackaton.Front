import axios from 'axios';

async function deletePremise(id: number | undefined, token: string | undefined) {
  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/premises/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.request(config).then((response) => {
    return response;
  }).catch((error) => {
    return error.response;
  });
  return response;
}

export default deletePremise;
