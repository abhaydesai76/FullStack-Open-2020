import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, cleanup } from '../reducers/loginReducer'
import blogService from '../services/blogService'
import proptypes from 'prop-types'

// const LoginForm = () => {
const LoginForm = ({ handleSubmit,  handleUsernameChange, handlePasswordChange, username, password }) => {

  const dispatch = useDispatch()

  // const handleSubmit = (event) => {
  //   event.preventDefault()

  //   const username = event.target.username.value
  //   event.target.username.value = ''

  //   const password = event.target.password.value
  //   event.target.password.value = ''

  //   const user = dispatch(login(username, password))
  //   console.log('user in loginForm : ', user)

  //   window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

  //   blogService.setToken(user.token)

  //   // setUser(user)
  //   // dispatch(cleanup(username, password))
  // }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
            username
          {/* <input id='username' type="text"/> */}
          <input id='username' type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
            password
          {/* <input id='password' type="password"/> */}
          <input id='password' type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: proptypes.func.isRequired,
  handleUsernameChange: proptypes.func.isRequired,
  handlePasswordChange: proptypes.func.isRequired,
  username: proptypes.string.isRequired,
  password: proptypes.string.isRequired
}

export default LoginForm