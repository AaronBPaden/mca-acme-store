import axios from 'axios';
import ApiConfig from '../config/ApiConfig';

const getAPI = (url, callback) => {
  axios.get(`${ApiConfig.URL}/${url}`, {responseType: 'json' })
    .then(res => {
      callback(res.data);
    })
    .catch(error => console.log(error))
}

const getAPIAsync = async (url) => {
  return await axios.get(`${ApiConfig.URL}/${url}`, {responseType: 'json' })
}

export {
  getAPI,
  getAPIAsync
}
