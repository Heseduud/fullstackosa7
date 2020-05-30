const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (s, i) => { return s + i.likes }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    else if (blogs.length === 1) return blogs[0]
    else {
        let favorite = blogs[0]

        blogs.forEach(blog => {
            if ( blog.likes > favorite.likes ) { favorite = blog }
        })

        const favoriteReturn = {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes    
        }

        return favoriteReturn
    }
}

const mostBlogs = (blogs) => {
    if (Array.isArray(blogs) && blogs.length) {
        const authorCount = _.countBy(blogs, 'author')
        const authorToReturn = {
            author: `${_.maxBy(Object.keys(authorCount), auth => authorCount[auth])}`,
            blogs: _.max(Object.values(authorCount))
        }
        return authorToReturn
    }
    else return {}
}

const mostLikes = (blogs) => {
    // SPAGHETTI CODE
    // Probably needs more validators for blogs to work in corner cases
    // TODO : smarter implementation
    if (Array.isArray(blogs) && blogs.length) {
        let tempArr = []
        
        // Group blogs by author
        const groupBlogs = _.groupBy(blogs, 'author')

        // Sum likes of each author and concat them with name to tempArr
        _.forEach(groupBlogs, (blogger) => {
            // Need better way to get name?
            const bloggerName = blogger[0].author
            const bloggerLikesSum = _.sumBy(blogger, obj => obj.likes)
            tempArr = _.concat(tempArr, {bloggerName, bloggerLikesSum})
        })

        let indexOfMostLikes = 0

        // Get index of object with largest likesSum
        for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i].bloggerLikesSum > tempArr[indexOfMostLikes].bloggerLikesSum) {
                indexOfMostLikes = i
            }
        }

        const returnable = {
            author: tempArr[indexOfMostLikes].bloggerName,
            likes: tempArr[indexOfMostLikes].bloggerLikesSum
        }

        return returnable
    }
    else return {}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }