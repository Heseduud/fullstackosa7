const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

/* 
    NOTE : All tests wont work after token authorization implementation 
    TODO: Find which ones and fix them
*/

describe('blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    
    test('all blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('return the right amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    describe('viewing a specific blog', () => {
        test('a specific blog is within the returned blog', async () => {
            const response = await api.get('/api/blogs')
            const contents = response.body.map(res => res.author)
            expect(contents).toContain(
                'Edsger W. Dijkstra'
            )
        })

        test('blog id is returned as id, not _id', async () => {
            const response = await api.get('/api/blogs')
            const firstResContent = response.body[0].id
            expect(firstResContent).toBeDefined()
        })
    })

    describe('adding blogs', () => {
        test('blogs can be added', async () => {
            const testPost = {
                title: 'TestiBlogi',
                author: 'Testi Testi',
                url: 'www.example.com',
                likes: 3
            }
        
            await api
                .post('/api/blogs')
                .send(testPost)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        
            const blogsAfterAdd = await helper.blogsInDb() 
            expect(blogsAfterAdd.length).toBe(helper.initialBlogs.length + 1)
            // TODO: one object of arr matches with returned
            // expect(blogsAfterAdd).toEqual(expect.arrayContaining([testPost]))
        })

        test('blog without likes is saved as 0 likes', async () => {
            const testPost = {
                title: 'TestiBlogi',
                author: 'Testi Testi',
                url: 'www.example.com'
            }
        
            await api
                .post('/api/blogs')
                .send(testPost)
                .expect(200)
        
            const latestBlog = await helper.latestBlog()
            // Latestblog always returns something and only returns one obj so this is ok
            expect(latestBlog[0].likes).toBe(0)
        })

        test('blog without title and url should return 400 bad request', async () => {
            const testPost = {
                author: 'Testi testi'
            }
        
            await api
                .post('/api/blogs')
                .send(testPost)
                .expect(400)
        })
    })

    describe('editing blogs', () => {
        test('a blog can be deleted', async () => {
            const initBlogs = await helper.blogsInDb()
            const toDelete = initBlogs[0]
        
            await api
                .delete(`/api/blogs/${toDelete.id}`)
                .expect(204)
        
            const blogsAfterDeletion = await helper.blogsInDb()
            expect(blogsAfterDeletion.length).toBe(initBlogs.length -1)
            expect(blogsAfterDeletion).not.toContain(toDelete)
        })
        
        test('a blog can be modified', async () => {
            const initBlogs = await helper.blogsInDb()
            const toModify = initBlogs[0]
        
            const newBlog = {
                title: "Modified",
                author: "Modified",
                url: "www.example.com",
                likes: 0
            }
        
            await api  
                .put(`/api/blogs/${toModify.id}`)
                .send(newBlog)
                .expect(200)
        
            const blogsAfterModify = await helper.blogsInDb()
            expect(blogsAfterModify.length).toBe(initBlogs.length)
            expect(blogsAfterModify[0].title).toBe(newBlog.title)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})