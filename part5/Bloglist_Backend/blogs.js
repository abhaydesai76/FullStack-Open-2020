const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {

  const authorization = request.get('authorization')  

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}

blogsRouter.post('/', async (request, response, next) => {
  try {
   
    const body = request.body  
    
    const token = getTokenFrom(request)
    
    const decodedToken = jwt.verify(token, process.env.SECRET)  
    
    if (!token || !decodedToken.id)
    {
      return response.status(401).json({ error: 'token missing or invalid'})
    }
    
    const user = await User.findById(decodedToken.id)    
      
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === '' ? 0 : body.likes,    
      user: user._id
    })
  
    const savedBlog = await blog.save()
  
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.json(savedBlog.toJSON())
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if (blog) 
  {
    response.json(blog.toJSON())
  } 
  else 
  {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {            
    const body = request.body

    const token = getTokenFrom(request)    

    if (!token)
    {
      return response.status(401).json({ error: 'token missing'})
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (!decodedToken.id)
    {
      return response.status(401).json({ error: 'token is invalid'})
    }
  
    const user = await User.findById(decodedToken.id)  
    
    const blogToBeDeletedId = request.params.id
    
    const blog = await Blog.findById(blogToBeDeletedId)    
    
    if (!blog)
    {
      console.log('the blog you are trying to remove is already deleted')      
      return response.status(401).json({ error: 'the blog you are trying to remove is already deleted'}).end()
    }        
    
    if (blog.user.toString() === user._id.toString())
    {
      await Blog.findByIdAndRemove(request.params.id)
    }
    else
    {
      console.log('A blog can be removed only by user who created it')      
      return response.status(401).json({ error: 'A blog can be removed only by user who created it'}).end()
    }  
  
    response.status(204).end()
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter