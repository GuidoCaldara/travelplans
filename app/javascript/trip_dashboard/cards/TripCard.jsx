import React, { useState, useEffect, useRef } from 'react'
import { capitalize } from '../utils'
import LinkToImg from '../../images/link_to.svg'

import Alert from '../alert/Alert.jsx'
import './TripCard.scss'
var FA = require('react-fontawesome')

const TripCard = ({ activity, user, removeActivity, showActivity, mapCard }) => {
  const [updateAlert, setUpdateAlert] = useState(false)
  const [destroyAlert, setDestroyAlert] = useState(false)

  const confirmAlert = () => {
    setUpdateAlert(false)
  }

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
    <div className={`trip-card ${mapCard ? 'map-card' : ''}`}>
      {updateAlert ? (
        <Alert
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
      {destroyAlert ? (
        <Alert
          updateActivities={updateActivities}
          activity={activity}
          user={user}
          alertType="destroy"
          title="Confirm?"
          dismiss={() => {
            setDestroyAlert(false)
          }}
          subtitle={`Do you want to delete this activity?`}
        />
      ) : null}
      <div
        className="card-picture"
        style={{ backgroundImage: `url(${activity.automatic_picture})` }}
      ></div>
      <div className="trip-card-info">
        <h3>{capitalize(activity.title)}</h3>
        <p className="card-location-info">
          {activity.location.substring(0, 20)}
          {activity.location.length > 20 ? '...' : null}
        </p>
        <span className="card-category">{`#${activity.category.toUpperCase()}`}</span>
      </div>
      <div className="card-link-box">
        <img
          onClick={() => {
            showActivity(activity)
          }}
          src={LinkToImg}
        />
      </div>
    </div>
  )
}

export default TripCard

// <FA
// name="trash"
// onClick={() => {
//   setDestroyAlert(true)
// }}
// />
// {activity.done ? (
// <FA name="check" />
// ) : (
// )}
