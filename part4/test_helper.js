const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test Blog 1',
        author: 'Bulla Khulla',
        url: 'http://blog.com/testblog1',
        likes: 5,
    },
    {
        title: 'Test Blog 2',
        author: 'Pote Khote',
        url: 'http://blog.com/testblog2',
        likes: 10,
    },
    {
        title: 'Test Blog 3',
        author: 'Ibu Hatela',
        url: 'http://blog.com/testblog3',
        likes: 15,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'nonExistingAuthor', url: 'nonExistingUrl' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }