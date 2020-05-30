const initialState = { msg: '', style: '' }
let timeoutID = undefined

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIF':
    return state = { ...state, msg: action.notif }

  case 'SET_STYLE':
    return state = { ...state, style: action.style }

  case 'CLEAR_NOTIF':
    return state = initialState

  default: return state
  }
}

export const setNotifWithTimeout = (notif, style, timeMS) => {
  return async dispatch => {
    clearTimeout(timeoutID)

    dispatch({
      type: 'SET_NOTIF',
      notif: notif
    })

    dispatch({
      type: 'SET_STYLE',
      style: style
    })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIF'
      })
    }, timeMS)
  }
}

export default reducer