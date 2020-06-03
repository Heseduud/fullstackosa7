import React, { useState } from 'react'
import loginService from '../services/login'
import storage from '../utils/storage'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setNotifWithTimeout } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password } )
      setUsername('')
      setPassword('')
      storage.saveUser(user)
      dispatch(setUser(user))
      dispatch(setNotifWithTimeout(`Welcome, ${user.name}!`, 'notif', 2000))
    } catch (e) {
      setUsername('')
      setPassword('')
      dispatch(setNotifWithTimeout('Invalid username or password', 'notifError', 2000))
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control
            type='text'
            name='Username'
            value={username}
            placeholder='Username'
            onChange={({ target }) => setUsername(target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            name='Password'
            value={password}
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}/>
        </Form.Group>
        <button id="login-button" type="submit">Login</button>
      </Form>
    </div>
  )
}

export default LoginForm