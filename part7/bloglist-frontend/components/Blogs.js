import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import Notification from './Notification'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { newBlog, deleteBlog } from '../reducers/blogReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'

const Blogs = (blogs) => {
  // create a React form reference which will be used to toggle / un-toogle "Create Blog" screen
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  //   useEffect(() => {
  //     dispatch(initializeBlogs()) },[dispatch])

  // const blogs = useSelector(state => state.blogs)
  console.log('blogs inside Blogs.js : ', blogs)
  // get loggedin user from redux state which will be used in "Remove Blog" validation
  let loggedinUser = useSelector(state => state.login)
  console.log('logged in user inside Blogs.js : ', loggedinUser)
  // Get available Notification from redux state (need to verify whether this is required)
  const notification = useSelector(state => state.notifications)

  // Function to notify users with various notifications being passed depending on operations
  const NotifyWith = (message, type='success') => {
    // setNotification({ message, type })
    // console.log('message inside notifyWith : ', message)
    dispatch(displayNotification(message, type),
      setTimeout(() => {
        dispatch(hideNotification(null))
      }, 4000))
  }

  // Function to create a new blog, "Create Blog" form will become visible by using form reference defined earlier
  const CreateBlog = async (blog) => {
    try {
      const blogToBeAdded = dispatch(newBlog(blog))
      // const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      // setBlogs(blogs.concat(newBlog))
      console.log('blogToBeAdded : ', blogToBeAdded)
      console.log('blogs : ', blogs)
      NotifyWith(`a new blog '${blogToBeAdded.title}' by ${blogToBeAdded.author} added!`)
    }
    catch(exception)
    {
      console.log(exception)
    }
  }
  // Function to remove selected blog depending on validation of user who created that blog and user who is trying to remove that blog
  const HandleRemove = async (id) => {
    const blogToRemove = blogs.blogs.find(b => b.id === id)
    console.log('inside HandleRemove : ', blogToRemove)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    try{
      if (ok) {
        console.log('logged in user inside HanldeRemove : ', loggedinUser.name)
        console.log('blog user inside HandleRemove : ', blogToRemove.author)

        if (loggedinUser.name === blogToRemove.author)
        {
          // await blogService.remove(id)
          const response = dispatch(deleteBlog(id))
          console.log('response inside HandleRemove : ', await response)
          // setBlogs(blogs.filter(b => b.id !== id))
        }
        else
        {
          window.alert('A blog can be removed only by user who created it')
        }

      }
    }
    catch (exception){
      window.alert(exception.message)
    }
  }

  // Logic to load blogs order by No of Likes
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={CreateBlog} />
      </Togglable>
      <p />
      {/* <ul> */}
      <Table striped>
        <tbody>
          {blogs.blogs.sort(byLikes).map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}> {blog.title} </Link></td>
              <td><Button onClick={() => HandleRemove(blog.id)}>Remove</Button></td>
            </tr>
          )}
        </tbody>
        {/* </ul> */}
      </Table>
    </div>
  )
}

export default Blogs