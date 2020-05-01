import userService from  '../services/userService'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_USER':
    return [...state, action.data]
  case 'UPDATE_USER':
    return action.data
  case 'INIT_USER':
    // console.log('action.data : ', action.data)
    return action.data
  case 'DELETE_USER':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    // console.log('users in userReducer: ', users)

    dispatch({
      type: 'INIT_USER',
      data: users
    })
  }
}

export default userReducer