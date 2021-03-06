const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blog.toJSON())
})

blogsRouter.post('/', async (req, res) => {
    let blog = null

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing/invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (_.has(req.body, 'likes')) {
        blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            likes: req.body.likes,
            user: user._id,
            comments: []
        })
    } else {
        blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            likes: 0,
            user: user._id,
            comments: []
        })
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    blog.comments = blog.comments.concat(req.body.comment)
    await blog.save()
    res.json(blog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing/invalid' })
    }
    
    const blogToDelete = await Blog.findById(req.params.id)

    if ( blogToDelete.user.toString() === decodedToken.id ) {
        await Blog.remove({ _id: blogToDelete.id })
        res.status(204).end()
    } else {
        return res.status(401).json({ error: 'unauthorized delete' })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }

    const modifiedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(modifiedBlog.toJSON())
})

module.exports = blogsRouter