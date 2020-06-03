import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { setNotifWithTimeout } from '../reducers/notificationReducer'
import { clearUser } from '../reducers/userReducer'

const Navigbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('localstorage after logout: ', window.localStorage)
    dispatch(clearUser())
    history.push('/login')
    dispatch(setNotifWithTimeout('Logged out', 'notif', 2000))
  }

  if (!user) return null

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand>Blogapp</Navbar.Brand>
      <Nav>
        <Link to='/' style={{ color: 'lightblue', marginRight: 3 }}>Blogs</Link>
        <Link to='/users' style={{ color: 'lightblue' }}>Users</Link>
      </Nav>
      <Navbar.Collapse className='justify-content-end'>
        <Navbar.Text className='mr-sm-2'>{ user.name } has logged in</Navbar.Text>
        <Button size='sm' onClick={handleLogout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigbar
