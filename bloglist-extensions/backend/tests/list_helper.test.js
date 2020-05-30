const listHelper = require('../utils/list_helper')
const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }
 , { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful",
     author: "Edsger W. Dijkstra", 
     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }
 , { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction",
     author: "Edsger W. Dijkstra", 
     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }
 , { _id: "5a422b891b54a676234d17fa", title: "First class tests",
     author: "Robert C. Martin", 
     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }
 , { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture",
     author: "Robert C. Martin", 
     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }
 , { _id: "5a422bc61b54a676234d17fc", title: "Type wars",
     author: "Robert C. Martin", 
     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('test with blogs list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('test with empty list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('test with 0 likes & single blog', () => {
        const singleBlog = [{ 
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0 }]

        const result = listHelper.totalLikes(singleBlog)
        expect(result).toBe(0)
    })
})

describe('favorite blog', () => {
    test('test with blogs list', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra", 
            likes: 12
        })
    })
    
    test('test with empty list', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(null)
    })
})

describe('most blogs', () => {
    test('test with blogs list', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3 
        })
    })

    test('test with empty blog lost', () => {
        const result = listHelper.mostBlogs()
        expect(result).toEqual({})
    })

    test('multiple bloggers with same amount of blogs', () => {
        const testArr = [{
            title: "T1",
            author: "Test1"
        },
        {
            title: "T2",
            author: "Test2"
        },
        {
            title: "T3",
            author: "Test1"
        },
        {
            title: "T4",
            author: "Test2"
        }]

        const result = listHelper.mostBlogs(testArr)
        expect(result).toEqual({
            author: "Test1",
            blogs: 2
        })
    })
})

describe('most likes', () => {
    test('test with blog list', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
    test('test with one blog', () => {
        const testArr = [{ author: "Test", likes: 3}]
        const result = listHelper.mostLikes(testArr)
        expect(result).toEqual({
            author: "Test",
            likes: 3
        })
    })
    test('test with one author, multiple blogs', () => {
        const testArr = [{ author: "test", likes: 3}, { author: "test", likes: 5 }]
        const result = listHelper.mostLikes(testArr)
        expect(result).toEqual({
            author: "test",
            likes: 8
        })
    })
})