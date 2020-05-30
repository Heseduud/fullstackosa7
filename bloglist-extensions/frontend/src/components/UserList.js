import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then((res) => (setUsers(res)))
  }, [])

  if (users) {
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs Added</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return null
}

export default UserList