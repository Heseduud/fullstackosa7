import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then((res) => (setUsers(res)))
  }, [])

  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <Table striped bordered hover variant='dark'>
          <tbody>
            <tr>
              <th>User</th>
              <th>Blogs Added</th>
            </tr>
            {users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`} style={{ color: 'lightblue' }}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }

  return null
}

export default UserList