import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notif = useSelector(state => state.notification)
  if (!notif || notif.msg === '') return null

  if (notif.style === 'notif') {
    return (
      <Alert variant='success'>
        {notif.msg}
      </Alert>
    )
  }

  if (notif.style === 'notifError') {
    return (
      <Alert variant='danger'>
        {notif.msg}
      </Alert>
    )
  }
}

export default Notification