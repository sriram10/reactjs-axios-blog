import axios from 'axios'

const ajaxObj = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export default ajaxObj;