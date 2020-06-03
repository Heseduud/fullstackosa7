import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`} style={{ color: 'lightblue' }}>{blog.title}</Link></td>
              <td>{blog.author}</td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList