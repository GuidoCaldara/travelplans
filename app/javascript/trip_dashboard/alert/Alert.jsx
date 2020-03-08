import React, { useState, useEffect } from 'react'
import IconConfirm from './IconConfirm'
import { destroyActivity } from '../utils'
import './Alert.scss'
var FA = require('react-fontawesome')

const Alert = ({
  activity,
  confirmAlert,
  closeShowPage,
  title,
  subtitle,
  dismiss,
}) => {
  const [displayConfirmIcon, setDisplayConfirmIcon] = useState(false)



  return (
    <div className="alert-background">
    

      <div className="alert-body">
      <FA
      className="close-form-icon"
      name="times"
      onClick={dismiss}
    />
        {displayConfirmIcon ? (
          <IconConfirm />
        ) : (
          <React.Fragment>
            <div className="alert-title">
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <div className="alert-btn-container">
              <button
                className="btn btn-sm btn-primary alert-btn"
                onClick={() => {
                  confirmAlert(activity)
                }}
              >
                Yes!
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default Alert


  // const confirmAlert = (currentUser, activity) => {
  //   setDisplayConfirmIcon(true)
  //   if (alertType === 'update') {
  //     updateActivityDone(activity, currentUser).then((response) =>
  //       setTimeout(() => {
  //         updateActivities('update')
  //         closeShowPage()
  //       }, 800)
  //     )
  //   } else if (alertType === 'destroy') {
  //     destroyActivity(activity, currentUser).then((response) =>
  //       setTimeout(() => {
  //         updateActivities('destroy')
  //       }, 800)
  //     )
  //   }
  // }