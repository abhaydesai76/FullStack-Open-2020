import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap'

import Blogs from  './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import storage from './utils/Storage'

import { userLogin, userLogout } from './reducers/loginReducer'
import { displayNotification, hideNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  // let user  = ''
  let username = ''
  let password = ''
  // let blogs = []
  // let users = []
  // useEffect(() => {
  //   blogService.getAll().then(blogs => setBlogs(blogs) ) }, [])

  // Initialize available Blogs from database and get them in redux state
  let blogs = useEffect(() => {
    dispatch(initializeBlogs())},[dispatch])

  // Initialize available Users in database and get them in redux state
  let users = useEffect(() => {
    dispatch(initializeUsers())},[dispatch])

  // Get available Blogs from redux state
  blogs = useSelector(state => state.blogs)
  console.log('blogs in App.js : ', blogs)
  // Get available Notification from redux state (need to verify whether this is required)
  let notification = useSelector(state => state.notifications)
  // console.log('notification : ', notification)
  // Get available Users from redux state
  users = useSelector(state => state.users)
  console.log('users in App.js : ', users)
  // Get available Login User from redux state
  let user = useSelector(state => state.login)
  // console.log('loggedinUsername in App.js: ', user )

  // Function to notify users with various notifications being passed depending on operations
  const NotifyWith = (message, type='success') => {
    dispatch(displayNotification(message, type),
      setTimeout(() => {
        dispatch(hideNotification(null))
      }, 4000))
  }

  // Function to let user login based on entered username and password and set loggedin username for further use in application
  const HandleLogin = async (event) => {
    event.preventDefault()

    try {
      username = event.target.username.value
      event.target.username.value = ''
      password = event.target.password.value
      event.target.password.value = ''

      // user = await loginService.login({ username, password })
      user = dispatch(userLogin(username, password))

      if (user !== undefined)
      {
        storage.saveUser(user)
        console.log('after storage saveuser : ', user)
      }

      // setUsername('')
      // setPassword('')
      // setUser(user)

      // notifyWith(`${username} welcome back!`)
      // user = storage.loadUser()
      if (user.name !== undefined)
      {
        NotifyWith(`${user.name} welcome back!`)
      }
    }
    catch(exception) {
      NotifyWith('wrong username/password', 'error')
    }
  }

  // Function to logout user who has loggedin and reset all other parameters to null
  const HandleLogout = () => {
    // setUser(null)
    console.log('inside HandleLogout')
    dispatch(userLogout())
    user = null
  }

  // Get loggedin user fromr localstorage if login was successful and user was saved as a successful login. If user is
  // already loggedin, then will go ahead and display navigation menu, otherwise re-direct to login screen
  user = storage.loadUser()
  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <Form onSubmit={HandleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control id='username' name='username'/>
            {/* <input id='username' value={username} onChange={({ target }) => setUsername(target.value)} /> */}
            <Form.Label>password</Form.Label>
            <Form.Control id='password' name='password'/>
            {/* <input id='password' value={password} onChange={({ target }) => setPassword(target.value)} /> */}
            <Button variant="primary" id="login" type="submit">login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
  else
  {
    return (
      <div className="container">
        <Router>
          {/* <div>
            <Link style={padding} to='/'>Home</Link>
            <Link style={padding} to='/blogs'>Blogs</Link>
            <Link style={padding} to='/users'>Users</Link>
          </div> */}

          {/* <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar> */}

          <Navbar collapseOnSelect expand="lg" bg="warning" variant="warning">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="mr-auto">
              <Nav.Link href="#">
                <Link style={padding} to='/'>Home</Link>
              </Nav.Link>
              <Nav.Link href="#">
                <Link style={padding} to='/blogs'>Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#">
                <Link style={padding} to='/users'>Users</Link>
              </Nav.Link>
              <Nav.Link href="#">
                {user ? <em>{user.name} logged in <Button variant="outline-danger" onClick={HandleLogout}>logout</Button></em> : <Link to='HandleLogin'>login</Link>}
              </Nav.Link>
            </Nav>
            <Form inline variant="warning">
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar>

          <Switch>
            <Route path="/blogs/:id">
              <Blog blogs={blogs} />
            </Route>
            <Route path='/blogs'>
              <Blogs blogs={blogs} />
            </Route>
            <Route path='/users/:id'>
              <User users={users} />
            </Route>
            <Route path='/users'>
              <Users users={users} />
            </Route>
            <Route path='/'>
            </Route>
          </Switch>
          <p />
          <div>
            <i>Bloglist app, University of Helsinki 2020</i>
          </div>
        </Router>
      </div>
    )
  }
}

export default App