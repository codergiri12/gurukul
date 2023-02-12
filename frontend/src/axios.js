import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:4000/api/v1';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

axios.defaults.withCredentials = true
export default axiosClient;