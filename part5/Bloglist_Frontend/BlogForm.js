import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle]  = useState('')
  const [author, setAuthor]  = useState('')
  const [url, setUrl]  = useState('')
  const [likes, setLikes]  = useState(0)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes + 1,
    })

    setNewBlog('')
  }

  return (
    <div>
      <h2>Create a new bog</h2>
      <form onSubmit={addBlog}>
          title: <input id='title' type="text" value={title} onChange={handleTitleChange} />
        <p />
          author: <input id='author' type="text" value={author} onChange={handleAuthorChange} />
        <p />
          url: <input id='url' type="text" value={url} onChange={handleUrlChange} />
        <p />
          likes: <input id='likes' type="text" value={likes} disabled={true}/>
        <p />
        <button id='createBlog' type="submit">create</button>
        <p />
      </form>
    </div>
  )
}

export default BlogForm