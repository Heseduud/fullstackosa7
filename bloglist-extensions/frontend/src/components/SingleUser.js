import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const SingleUser = (props) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log(props.match.params.id)
    userService.getOne(props.match.params.id)
      .then((res) => (setUser(res)))
  }, [])

  if (user && user.blogs) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  }

  return null
}

export default SingleUser