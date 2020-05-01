import loginService from '../services/loginService'
import storage from '../utils/Storage'

const loginReducer = (state = '', action) => {
  switch (action.type) {
  case 'LOGIN' :
    return action.data
  case 'LOGOUT' :
    return null
  default:
    return state
  }
}

export const userLogin = (username, password)  => {
  // console.log('username inside loginReducer :', username)
  // console.log('password inside loginReducer : ', password)
  return async dispatch => {
    const user = await loginService.login({ username, password })

    storage.saveUser(user)

    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const userLogout = () => {
  return async dispatch => {
    storage.logoutUser()

    dispatch({
      type: 'LOGOUT',
      data: ''
    })
  }
}

export default loginReducer