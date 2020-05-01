import React from 'react'
import { Table, Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {

  let title = ''
  let author = ''
  let url = ''

  const handleNewBlog = (event) => {
    event.preventDefault()

    title = event.target.title.value
    event.target.title.value = ''

    author = event.target.author.value
    event.target.author.value = ''

    url = event.target.url.value
    event.target.url.value = ''

    props.createBlog({
      title, author, url
    })

    // setTitle('')
    // setAuthor('')
    // setUrl('')
  }

  return (
    <div>
      <h3>create new</h3>
      <Form onSubmit={handleNewBlog}>
        <tr>
          <Form.Label>author</Form.Label>
          <Form.Control id='author' name='author' />
          {/* <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} /> */}
        </tr>
        <div>
          <Form.Label>title</Form.Label>
          <Form.Control id='title' name='title' />
          {/* <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} /> */}
        </div>
        <div>
          <Form.Label>url</Form.Label>
          <Form.Control id='url' name='url' />
          {/* <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} /> */}
        </div>
        <p />
        <Button id="create">create</Button>
      </Form>
    </div>
  )
}

export default NewBlog