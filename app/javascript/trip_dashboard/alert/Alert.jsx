import React, { useState, useEffect } from 'react'
import IconConfirm from './IconConfirm'
import {markActivityAsDone, destroyActivity} from '../utils'
import './Alert.scss'
const Alert = ({ alertType, activity, user, title, subtitle, dismiss, updateActivities }) => {
  const [displayConfirmIcon, setDisplayConfirmIcon] = useState(false)

  const confirmAlert = () => {
    setDisplayConfirmIcon(true)
    if (alertType === 'update'){
      markActivityAsDone(activity, user)
      .then((response) =>
      setTimeout(()=>{updateActivities('update') },800)
      )
    } else if (alertType === 'destroy'){
      destroyActivity(activity, user)
      .then((response) =>
      setTimeout(()=>{updateActivities('destroy') },800)
      )
    };
  }

  return (
    <div className="alert-background">
      <div className="alert-body">
        {displayConfirmIcon ? (
          <IconConfirm />
        ) : (
          <React.Fragment>
            <div className="alert-title">
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <div className="alert-btn-container" >
              <button className="alert-btn alert-dismiss-btn" onClick={dismiss}>
                Nope
              </button>
              <button className="alert-btn alert-confirm-btn" onClick={confirmAlert}>Yes!</button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default Alert
