import axios from 'axios'
import storage from '../utils/storage'
const baseUrl = '/api/blogs'

const getAuth = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog) => {
  const res = await axios.post(baseUrl, newBlog, getAuth())
  return res.data
}

const likeBlog = async (blog) => {
  const blogToPut = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
  }

  const res = await axios.put(`${baseUrl}/${blog.id}`, blogToPut)

  res.data.user = blog.user
  return res.data
}

const commentBlog = async (blog, comment) => {
  const res = await axios.post(`${baseUrl}/${blog.id}/comments`, { comment: comment })
  return res.data
}

const removeBlog = async (blog) => {
  const res = await axios.delete(`${baseUrl}/${blog.id}`, getAuth())
  return res.status
}

export default { getAll, createBlog, likeBlog, removeBlog, commentBlog }