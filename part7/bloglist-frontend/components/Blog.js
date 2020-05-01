import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLikes, updateComment } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'

const Blog = ({ blogs }) => {

  const dispatch = useDispatch()

  // create a state object to retain user comments
  const [userComment, setUserComment] = useState([])
  // get available blogs in system on which user can give comments
  let blogComments = useSelector(state => state.blogs)
  console.log('inside Blog.js blogComments: ', blogComments)

  // get blogId for which user wants to give comment
  const blogId = useParams().id
  // get selected blog on which user wants to give comment
  const selectedBlog = blogs.find(n => n.id === blogId)
  console.log('selectedBlog inside Blog.js : ', selectedBlog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Function to generate unique id for new user comment
  const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

  if (selectedBlog === undefined)
  {
    return null
  }

  // Function to add / increase number of likes on a blog
  const HandleLike = async (id) => {
    // get selected blog which user wants to like
    const blogToLike = blogs.find(b => b.id === id)
    console.log('blogToLike : ', blogToLike)
    // incraese no of likes on user selected blog
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    console.log('likedBlog : ', likedBlog)
    // await blogService.update(likedBlog)
    // send a call to update database record as well as redux state for selected blog with updated no if likes
    dispatch(updateLikes(likedBlog))
    // setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))
  }

  // Function to add user comment on selected blog
  const AddComments = (id) => {
    // get selected blog on which user wants to give comment
    const blogToComment = blogs.find(b => b.id === id)
    let comments = ''
    // Append user entered comment to existing comments array
    if (blogToComment.comments.length !== 0)
    {
      comments = blogToComment.comments.concat({ id: generateId(), comments: userComment })
    }
    else
    // if this is the first comment being entered by user, insert it as an arracy object
    {
      comments = ({ id: generateId(), comments: userComment })
    }

    // const commentToAdd = { id: generateId() , comments: blogToComment.comments.concat(userComment) }
    console.log('commentToAdd inside Blog.js : ', comments)
    const commentedBlog = { ...blogToComment, comments }
    // const commentedBlog = { ...blogToComment, comments, user: blogToComment.user.id }
    console.log('commentedBlog inside AddComments : ', commentedBlog)
    // setBlogComments(blogComments.concat(userComment))

    // post updated blog with comment to save in database as well as redux store
    dispatch(updateComment(commentedBlog))
  }

  return (
    <Table striped>
      <tbody>
        <div style={blogStyle} className='blog'>
          <tr>{selectedBlog.title} by {selectedBlog.author}</tr>
          <tr>{selectedBlog.url}</tr>
          <tr>likes {selectedBlog.likes}
            <Button onClick={() => HandleLike(selectedBlog.id)}>   like</Button>
          </tr>
          <tr>added by {selectedBlog.user.name}</tr>
          <br />
          <Form>
            <tr><b>comments</b></tr>
            <p />
            <Form.Control id="comments" name="comments" placeholder="comments" onChange={({ target }) => setUserComment(target.value)} />
            <p />
            <Button onClick={() => AddComments(selectedBlog.id)}>Add Comments</Button>
            <p />
            <tr>
              {selectedBlog.comments.map(comment =>
                <li key={selectedBlog.comments.id}>{comment.comments}</li>)}
            </tr>
          </Form>
        </div>
      </tbody>
    </Table>
  )
}
export default Blog