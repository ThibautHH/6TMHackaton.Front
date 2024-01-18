import axios from 'axios';

async function getEmployees() {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/employees?paginate=false`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.request(config)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
  return response;
}

export default getEmployees;
