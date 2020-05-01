const togglableReducer = (state = false, action) => {
  switch (action.type) {
  case 'NOT_VISIBLE':
    console.log('action.data : ', action.data)
    return action.data
  case 'VISIBLE':
    return action.data
  default:
    return state
  }
}

export const toggleVisible = (display) => {
  return async dispatch => {
    console.log( 'inside toggleVisible : ')
    dispatch ({
      type: 'NOT_VISIBLE',
      data: !display
    })
  }
}

export default togglableReducer