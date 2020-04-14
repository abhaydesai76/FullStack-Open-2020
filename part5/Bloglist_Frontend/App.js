import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername]  = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs( initialBlogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setSuccessMessage(`Success: A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null) }, 5000)
      })
      .catch(error => error.message)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login( { username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setSuccessMessage(`Success: User ${user.name} logged in successfully`)
      setTimeout(() => {
        setSuccessMessage(null) }, 5000)
    }
    catch (exception) {
      setErrorMessage('Error: wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null) }, 5000)
    }
  }

  const Logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    const user = null
    setUser(user)
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login' >
      <LoginForm
        username = {username}
        password = {password}
        handleUsernameChange = {({ target }) => setUsername(target.value)}
        handlePasswordChange = {({ target }) => setPassword (target.value)}
        handleSubmit = {handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  // const blogForm = () => (
  //   <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
  //     <BlogForm onSubmit={addBlog}
  //       title={title} handleTitleChange={handleTitleChange}
  //       author={author} handleAuthorChange={handleAuthorChange}
  //       url={url} handleUrlChange={handleUrlChange}
  //       likes={likes} />
  //   </Togglable>
  // )

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={successMessage === null ? errorMessage : successMessage} />

      {user === null ?
        loginForm() :
        <div>
          {user.name} logged in
          <button id='logout-button' type="reset" onClick={Logout}>Logout</button>
          <p />
          {blogForm()}
          <ul>
            {blogs.sort(function(a,b) {return b.likes - a.likes}).map(blog =>
              <Blog key={blog.id} blog={blog}/>
            )}
          </ul>
        </div>
      }

      <Footer />
    </div>
  )
}

export default App