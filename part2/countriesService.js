import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2/all'
const weatherUrl= 'http://api.weatherstack.com/current?access_key=309307bf381b7c7d305db714c9b56736'
// const baseUrl = 'http://localhost:3001/countries'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getWeatherDetails = (props) => {
  const request = axios.get(weatherUrl + '&query===' + props)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, getWeatherDetails, create, update, remove }