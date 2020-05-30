import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(state => state.notification)
  if (notif) {
    return (
      <div className={notif.style}>
        {notif.msg}
      </div>
    )
  }

  return <div></div>
}

export default Notification