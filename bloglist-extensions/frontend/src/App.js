import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import SingleUser from './components/SingleUser'
import Blog from './components/Blog'
import UserList from './components/UserList'
import Home from './components/Home'
import Navigbar from './components/Navbar'
import { setUser } from './reducers/userReducer'
import storage from './utils/storage'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(initBlogs()) }, [dispatch])
  useEffect(() => {
    dispatch(setUser(storage.loadUser()))
  }, [dispatch])

  return (
    <div className='container'>
      <Router>
        <Navigbar/>
        <Notification/>
        <br/>
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

export default App