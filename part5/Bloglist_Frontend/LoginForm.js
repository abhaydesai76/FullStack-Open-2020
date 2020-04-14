import React from 'react'
import proptypes from 'prop-types'

const LoginForm = ({ handleSubmit,  handleUsernameChange, handlePasswordChange, username, password }) => {

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
            username
          <input id='username' type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
            password
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