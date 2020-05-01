import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  console.log('inside login service : ', response.data)
  return response.data
  // return request.then(response =>
  //   response.data)
}

export default { login }