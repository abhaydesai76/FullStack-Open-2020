import React, { useState } from 'react'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog }) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const updateBlogLikes = (event) => {

    event.preventDefault()

    const updatedBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }

    blogService.update(blog.id, updatedBlogObject )
      .then(returnedBlog => {
        // console.log(returnedBlog)
        blog.likes = returnedBlog.likes
      })
      .catch(error => error.message)
  }

  const removeBlog = (event) => {

    event.preventDefault()

    if (blog.author !== undefined)
    {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) === true)
      {
        blogService.remove(blog.id)
          .then(deletedBlog => {
            console.log(deletedBlog)
          })
          .catch(error => {
            if (error.response.status === 401)
            {
              window.alert('A blog can be removed only by user who created it')
            }
            else
            {
              window.alert(error.message)
            }
          }
          )
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        Title: {blog.title} <button id='hidebutton' onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        Title: {blog.title} <button id='showbutton' onClick={toggleVisibility}>Hide</button>
        <p />
        URL: {blog.url}
        <p />
        Likes: {blog.likes} <button id='likebutton' onClick={updateBlogLikes}>like</button>
        <p />
        Author: {blog.author}
        <p />
        <button id='removebutton' onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog