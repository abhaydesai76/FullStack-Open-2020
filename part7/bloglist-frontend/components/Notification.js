import React from 'react'

const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }

  // console.log('notification inside Notification ;', notification)
  // console.log('notification message inside Notification : ', notification.message)
  // console.log('notification type inside Notification : ', notification.type)
  // console.log('notification user inside Notification : ', notification.user)

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>    
    {notification.notification}
  </div>
}

export default Notification