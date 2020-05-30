import React, { useState } from 'react'
import loginService from '../services/login'
import Notification from '../components/Notification'
import storage from '../utils/storage'
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
      <Notification/>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm