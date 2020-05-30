import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotifWithTimeout } from '../reducers/notificationReducer'
import { addBlogRedux } from '../reducers/blogReducer'

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
    <div className='formDiv'>
      <h1>Add blog</h1>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id='title'
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id='url'
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button id="submitButton" type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm