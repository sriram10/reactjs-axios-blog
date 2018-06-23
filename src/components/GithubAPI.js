import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.github.com',
  params: {
    id: 12
  }
})