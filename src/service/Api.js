import axios from 'axios'
const API_URL = 'https://api.coindesk.com/v1/bpi/'

export default() => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
