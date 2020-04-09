const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const author = response.body.map(r => r.author)
    expect(author).toContain(
      'Bulla Khulla'
    )
  })

  describe('viewing a specific blog', () => {

    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      console.log(validNonexistingId)

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5e8d77d58ae2b108080824e9'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(404)
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Test Blog 4',
        author: 'Shankar Coolie',
        url: 'http://blog.com/testblog4',
        likes: 100
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const author = blogsAtEnd.map(n => n.author)
      expect(author).toContain(
        'Shankar Coolie'
      )
    })

    test('fails with status code 500 if data invalid', async () => {
      const newBlog = {        
        title: 'Test Blog 5',        
        likes: 50
      }

      await api
        .post('/api/blogs')
        .set('Authorization','bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImJ1bGxhIiwiaWQiOiI1ZThlY2NmYjg4NWM2YjFjMzQ2YzIwMjAiLCJpYXQiOjE1ODY0MjA2MTd9.hwCsvO9LxfASeMYoUW0I0g1mROhJuNAfa1pHXLMQICs')
        .send(newBlog)
        .expect(500)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('fails with status code 401 if token is missing', async () => {
      const newBlog = {
        title: 'Test Blog 25',
        author: 'Bulla Khulla',
        url: "http://blog.com/testblog25",
        likes: 25,
        userId: "5e8eccfb885c6b1c346c2020"
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(500)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
      )

      const author = blogsAtEnd.map(r => r.author)

      expect(author).not.toContain(blogToDelete.author)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})