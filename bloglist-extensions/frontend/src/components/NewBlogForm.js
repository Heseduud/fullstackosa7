import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotifWithTimeout } from '../reducers/notificationReducer'
import { addBlogRedux } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    dispatch(addBlogRedux(newBlog))
    dispatch(setNotifWithTimeout(`New blog: ${newBlog.title} by ${newBlog.author} added!`, 'notif', 2000))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h3>Add a blog</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Control type='text' name='Title' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} placeholder='Title'/>
          <Form.Control type='text' name='Author' value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} placeholder='Author'/>
          <Form.Control type='text' name='Url' value={newUrl} onChange={({ target }) => setNewUrl(target.value)} placeholder='Url'/>
        </Form.Group>
        <Button variant='success' type='submit'>Create</Button>
      </Form>
    </div>
  )
}

export default NewBlogForm