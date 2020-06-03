import React, { useState, useEffect } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import userService from '../services/users'

const SingleUser = (props) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    userService.getOne(props.match.params.id)
      .then((res) => (setUser(res)))
  }, [props.match.params.id])

  if (!user || !user.blogs) {
    return null
  }

  return (
    <Container>
      <ListGroup>
        <ListGroup.Item variant='dark'>
          <h2>{user.name}</h2>
        </ListGroup.Item>
        <ListGroup.Item variant='dark'>
          <h3>Added blogs</h3>
          <ul>
            { user.blogs.lenth > 0
              ? user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
              : <li>No added blogs</li>}
          </ul>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}

export default SingleUser