import axios from 'axios';

export async function putEmployee(id: string) {
  const config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/${id}`,
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
