const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    { 
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra", 
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },    
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra", 
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }
]

// Returns a new unused id for db
const nonExistingId = async () => {
    const blog = new Blog({ title: 'temp', author: 'temp', url: 'temp', likes: 0 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

// Returns all blogs in db
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

// Returns latest blog added in an array
const latestBlog = async () => {
    const blog = await Blog.find({}).sort({'_id':-1}).limit(1)
    return blog.map(blog => blog.toJSON())
}

// Returns all users in db
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, latestBlog, usersInDb }