import axios from 'axios'
import storage from '../utils/Storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('response inside blogService.js : ', response)
  return response.data
  // return request.then(response => response.data)
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, getConfig())

  return response.data
}

const updateLikes = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())

  return response.data

  // const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  // return request.then(response => response.data)
}

const remove = async (id) => {
  // const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  // return request.then(response => response.data)
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
    console.log('response from backend: ', response)
    return response.data
  }
  catch (exception) {
    console.log('exception : ', exception.message)
    return exception
  }
}

const updateComment = async (blog) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, blog, getConfig())
  console.log('response from backend: ', response)
  return response.data
}

export default { getAll, create, updateLikes, updateComment, remove }