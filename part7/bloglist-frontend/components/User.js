import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { useParams, Redirect } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogUser = ( { users } ) => {
  console.log('user : ', users)
  const userId = useParams().id
  console.log('userId inside User.js : ', userId)
  const selectedUser = users.find(n => n.id === userId)
  console.log('selectedUser inside User.js : ', selectedUser)

  if (selectedUser === undefined)
  {
    window.alert('Please select a user on Users screen')
    return null
  }
  else
  {
    return (
      <Table striped>
        <tbody>
          <h2>{selectedUser.name}</h2>
          <p />
          <tr>added blogs :</tr>
          <p />
          <div>
            {selectedUser.blogs.map(blog =>
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.url}</td>
                <td>{blog.likes}</td>
              </tr>
            )}
          </div>
        </tbody>
      </Table>
    )
  }
}

export default BlogUser