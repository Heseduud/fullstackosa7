import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifWithTimeout } from '../reducers/notificationReducer'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { Container, ListGroup, Button, Form, } from 'react-bootstrap'

const Blog = () => {
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === params.id))
  const user = useSelector(state => state.user)

  const [comment, setComment] = useState('')

  const dispatchVote = (blog) => {
    dispatch(likeBlog(blog))
  }

  const dispatchRemove = (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotifWithTimeout(`${blog.title} by ${blog.author} removed`, 'notif', 2000))
      history.push('/')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  if (!blog || !user) {
    return null
  }

  return (
    <Container>
      <ListGroup>
        <ListGroup.Item variant='dark'>
          <h2>{blog.title} by {blog.author}</h2>
        </ListGroup.Item>
        <ListGroup.Item variant='dark'>Url: <a href={`https://${blog.url}`}>{blog.url}</a></ListGroup.Item>
        <ListGroup.Item variant='dark' style={{ verticalAlign: 'center' }}>{blog.likes} likes
          <Button variant='dark' size='sm' style={{ float: 'right' }} onClick={() => {dispatchVote(blog)}}>Like</Button></ListGroup.Item>
        <ListGroup.Item variant='dark'>
          Added by {blog.user.name} {blog.user.username === user.username
            ? <Button variant='dark' size='sm' style={{ float: 'right' }} onClick={() => {dispatchRemove(blog)}}>Remove</Button>
            : <br/>}
        </ListGroup.Item>
        <ListGroup.Item variant='dark'>
          <h3>Comments: </h3>
          <ul>
            { (blog.comments.length > 0)
              ? blog.comments.map((comment, index) =>  <li key={index}>{comment}</li>)
              : <li>No comments yet</li>}
          </ul>
          <Form className='' inline onSubmit={handleComment} style={{ float: 'right' }}>
            <Form.Control placeholder='New Comment' className='mr-sm-2' size='sm' value={comment} onChange={({ target }) => setComment(target.value)}/>
            <Button className='sm-2' size='sm' variant='dark' type="submit">Submit</Button>
          </Form>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}

export default Blog