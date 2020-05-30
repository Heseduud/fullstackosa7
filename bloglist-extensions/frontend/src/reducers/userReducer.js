import loginService from '../services/login'
const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER':
    return state = action.user

  case 'CLEAR_USER':
    return state = initialState

  default: return state
  }
}

export const loginUser = (creds) => {
  return async dispatch => {
    const user = await loginService.login(creds)
    dispatch({
      type: 'SET_USER',
      user: user
    })
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user: user
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

export default reducer