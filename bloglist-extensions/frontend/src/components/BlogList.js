import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifWithTimeout } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatchVote = (blog) => {
    dispatch(likeBlog(blog))
  }

  const dispatchRemove = (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotifWithTimeout(`${blog.title} by ${blog.author} removed`, 'notif', 2000))
    }
  }

  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}



/*
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          {blog.title} {blog.author} <br/>
          {blog.url} <br/>
          {blog.likes} <button onClick={() => {dispatchVote(blog)}}>Like</button> <br/>
          {blog.author} <br/>
          <button onClick={() => {dispatchRemove(blog)}}>Remove</button>
        </div>
      )}



        </div>
*/

export default BlogList