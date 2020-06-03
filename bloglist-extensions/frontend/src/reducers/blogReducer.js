import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {

  case 'LIKE_BLOG': {
    const liked = action.liked
    return state
      .map(blog => blog.id !== liked.id ? blog : liked)
      .sort((a, b) => { return b.likes - a.likes })
  }

  case 'ADD_BLOG':
    return state.concat(action.data)

  case 'REMOVE_BLOG': {
    const removed = action.removed
    return state
      .filter(blog => blog.id !== removed.id)
  }

  case 'INIT_BLOGS':
    return action.content.sort((a, b) => { return b.likes - a.likes })

  case 'COMMENT_BLOG': {
    const commented = action.commented
    return state
      .map(blog => blog.id !== commented.id ? blog : commented)
  }

  default: return state
  }
}

export const addBlogRedux = (data) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(data)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.removeBlog(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      removed: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const liked = await blogService.likeBlog(blog)
    dispatch({
      type: 'LIKE_BLOG',
      liked: liked
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const commented = await blogService.commentBlog(blog, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      commented: commented
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      content: blogs
    })
  }
}

export default reducer