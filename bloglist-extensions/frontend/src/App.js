import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifWithTimeout } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
// import BlogList from './components/BlogList'
import Notification from './components/Notification'
// import NewBlogForm from './components/NewBlogForm'
// import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import SingleUser from './components/SingleUser'
import Blog from './components/Blog'
import UserList from './components/UserList'
import Home from './components/Home'
import { setUser, clearUser } from './reducers/userReducer'
import storage from './utils/storage'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'

const App = () => {
  // const blogFormRef = React.createRef()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const history = useHistory()
  console.log(history)

  useEffect(() => { dispatch(initBlogs()) }, [dispatch])
  useEffect(() => {
    dispatch(setUser(storage.loadUser()))
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(setNotifWithTimeout('Logged out', 'notif', 2000))

    window.localStorage.removeItem('loggedBlogappUser')
    console.log(window.localStorage)
    dispatch(clearUser())
    history.push('/login')
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user ? <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p> : <p></p>}
      <Notification/>
      <Router>
        <Switch>
          <Route path='/blogs/:id' component={Blog}/>
          <Route path='/users/:id' component={SingleUser}/>
          <Route path='/users'>
            { user !== undefined ?
              <UserList/>
              : <Redirect to='/login'/>
            }
          </Route>
          <Route path='/login'>
            { user ?
              <Redirect to='/'/>
              : <LoginForm/>
            }
          </Route>
          <Route path='/'>
            { user ?
              <Home/>
              : <Redirect to='/login'/>
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

/*
            <div>
              <BlogList/>
              <br/>
              <Togglable buttonLabel="New Note" ref={blogFormRef}>
                <NewBlogForm/>
              </Togglable>
            </div>
*/

export default App