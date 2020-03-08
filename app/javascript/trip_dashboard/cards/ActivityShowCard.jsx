import React, { useState, useEffect, user } from 'react'
import './ActivityShowCard.scss'
import Alert from '../alert/Alert.jsx'

const FA = require('react-fontawesome')

const ActivityShowCard = ({ activity, user, closeShowPage}) => {
  const [updateAlert, setUpdateAlert] = useState(false)

  const updateActivities = (type) => {
    if (type === 'update') {
      activity.done = true
      setUpdateAlert(false)
    } else if (type === 'destroy') {
      removeActivity(activity)
      setDestroyAlert(false)
    }
  }

  return (
    <div className="show-activity-card-wrapper">
      {updateAlert ? (
        <Alert
          closeShowPage={closeShowPage}
          updateActivities={updateActivities}
          activity={activity}
          user={user}
          alertType="update"
          title="Confirm?"
          dismiss={() => {
            setUpdateAlert(false)
          }}
          subtitle={`Mark ${activity.title} as seen?`}
        />
      ) : null}

      <img className="activity-show-img" src={activity.automatic_picture} />
      <div className="activity-description-box">
        <h3>Description</h3>
        <p>{activity.notes}</p>
      </div>
      {activity.done ? null : (      <button
        onClick={() => {
          setUpdateAlert(true)
        }}
        className="btn btn-primary"
      >
        <FA name="eye" />
        Mark as Seen
      </button>
)}
    </div>
  )
}

export default ActivityShowCard
