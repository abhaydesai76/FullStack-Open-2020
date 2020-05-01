import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (users) => {

  const notification = useSelector(state => state.notifications)

  return (
    <Table striped>
      <tbody>
        <tr><h2>users</h2></tr>
        <p />
        <tr><h3>blogs created</h3></tr>

        {users.users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name} {user.blogs.length}</Link></td>
            {/* {user.name} {user.blogs.length} */}
          </tr>
        )}

      </tbody>
    </Table>
  )
}

export default Users