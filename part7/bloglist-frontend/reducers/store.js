import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import loginReducer from '../reducers/loginReducer'
import userReducer from '../reducers/userReducer'
import togglableReducer from '../reducers/togglableReducer'
import commentReducer from '../reducers/commentReducer'

const reducer = combineReducers ({
  blogs: blogReducer,
  notifications: notificationReducer,
  login: loginReducer,
  users: userReducer,
  togglable: togglableReducer,
  comments: commentReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store