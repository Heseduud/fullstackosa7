const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

/* 
    NOTE : All tests wont work after token authorization implementation 
    TODO: Find which ones and fix them
*/

describe('users', () => {
    // Clear db and create example user before every test
    beforeEach(async () => {
        console.log('beforeEach for users')
        await User.deleteMany({})
        const passHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passHash })
        await user.save()
    })

    test('user can be created', async () => {
        const initUsers = await helper.usersInDb()

        const newUser = {
            username: 'Heseduud',
            name: 'Santeri Nurminen',
            password: 'password123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterAdd = await helper.usersInDb()
        expect(usersAfterAdd).toHaveLength(initUsers.length + 1)
    })

    describe('username related', () => {
        test('user with no username cannot be created', async () => {
            const newUser = {
                name: 'Santeri Nurminen',
                password: 'pass1234'
            }
    
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })
    
        test('usernames have to be unique', async () => {
            const newUser = {
                username: 'Heseduud',
                name: 'Santeri Nurminen',
                password: 'password123'
            }
    
            const anotherUser = {
                username: 'Heseduud',
                name: 'Arto Hellas',
                password: 'sekret'
            }
    
            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
    
            // Trying to create user with non-unique username gives error 400
            await api
                .post('/api/users')
                .send(anotherUser)
                .expect(400)
        })
    })

    describe('password related', () => {
        test('password cannot be less than 3 chars', async () => {
            const newUser = {
                username: 'Heseduud',
                name: 'Santeri nurminen',
                password: 'aa'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})