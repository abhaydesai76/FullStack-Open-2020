const commentReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_COMMENT':
    console.log('state inside commentReducer : ', state)
    console.log('action.data inside commentReducer : ', action.data)
    return [...state, action.data]
  default:
    return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const addComment = (comment) => {
  return {
    type: 'ADD_COMMENT',
    data: { id: generateId(),
            comment: comment }
  }
}

export default commentReducer