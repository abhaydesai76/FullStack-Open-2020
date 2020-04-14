import React from 'react'

const Notification = ({ message }) => {

  if (message === null) {
    return null
  }

  var messageHeader = message.substring(0,7)

  if (messageHeader === 'Success')
  {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  else
  {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

export default Notification