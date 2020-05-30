import React from 'react'
import BlogList from './BlogList'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'

const Home = () => {
  const blogFormRef = React.createRef()

  return (
    <div>
      <BlogList/>
      <br/>
      <Togglable buttonLabel="New Note" ref={blogFormRef}>
        <NewBlogForm/>
      </Togglable>
    </div>
  )
}

export default Home