import axios from 'axios';

async function getPremise(id: string) {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/premises/${id}`,
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

export default getPremise;
