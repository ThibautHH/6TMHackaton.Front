import Axios from 'axios';

async function getToken(username: string, password: string) {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username: username,
      password: password
    }
  };
  const response = await Axios.request(config).then((response) => {
    return response;
  }).catch((error) => {
    return error.response;
  });
  return response;
}

export default getToken;
