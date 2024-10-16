import React from 'react'

export default function Alert(props) {
  return (
    <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
    <strong>{props.message}</strong>
  </div>
  )
}


