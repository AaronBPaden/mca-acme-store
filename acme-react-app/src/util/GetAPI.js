import axios from 'axios';
import ApiConfig from '../config/ApiConfig';

const GetAPI = ({url, query = '', callback}) => {
  url += query !== '' ? '?' + query : '';
  axios.get(`${ApiConfig.URL}/${url}`, {responseType: 'json' })
    .then(res => {
      callback(res.data);
    })
    .catch(error => console.log(error))
}

export default GetAPI;
