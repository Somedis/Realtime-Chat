import React from 'react'
import classes from './LogButton.module.css'

const LogButton = ({children, ...props}) => {
  return (
    <button {...props} className={classes.LogBtn}>
        {children}
    </button>
  )
}

export default LogButton