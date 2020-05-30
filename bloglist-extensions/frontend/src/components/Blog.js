import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifWithTimeout } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === params.id))
  const user = useSelector(state => state.user)

  const dispatchVote = (blog) => {
    dispatch(likeBlog(blog))
  }

  const dispatchRemove = (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotifWithTimeout(`${blog.title} by ${blog.author} removed`, 'notif', 2000))
    }
  }

  if (!blog || !user) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => {dispatchVote(blog)}}>Like</button></p>
      <p>Added by {blog.user.name} {blog.user.username === user.username
        ? <button onClick={() => {dispatchRemove(blog)}}>remove</button>
        : <br/>}</p>
    </div>
  )
}

export default Blog
