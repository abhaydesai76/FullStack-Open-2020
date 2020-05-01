import axios from 'axios'
import storage from '../utils/Storage'

const baseURL = '/api/users'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = async () => {
  const response = await axios.get(baseURL)
  // console.log('response in userService : ', response.data)
  return response.data
}

const create = (user) => {
  const request = axios.post(baseURL, user, getConfig())
  return request.then(response => response.data)
}

const update = (user) => {
  const request = axios.put(`${baseURL}/${user.id}`, user, getConfig())
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`, getConfig())
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }