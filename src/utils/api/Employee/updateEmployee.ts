import axios from 'axios';
import Employee from '../../types/Employee';

async function updateEmployee(
  data: Employee, id: number | undefined, token: string | undefined
) {
  const config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/employees/${id}`,
    headers: {
      'Content-Type': 'application/merge-patch+json',
      'Authorization': 'Bearer ' + token
    },
    data: data
  };
  const response = await axios.request(config).then((response) => {
    return response;
  }).catch((error) => {
    return error.response;
  });
  return response;
}

export default updateEmployee;
