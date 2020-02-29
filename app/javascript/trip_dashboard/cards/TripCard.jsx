import React, { useState, useEffect, useRef } from 'react'
import {capitalize} from '../utils'

import Alert from '../alert/Alert.jsx'
import './TripCard.scss'
var FA = require('react-fontawesome')

const TripCard = ({ activity, user, removeActivity }) => {
  const [updateAlert, setUpdateAlert] = useState(false)
  const [destroyAlert, setDestroyAlert] = useState(false)


  const confirmAlert = () => {
    setUpdateAlert(false)
  }

  const updateActivities = (type) =>{
    if (type === "update"){
      activity.done = true
      setUpdateAlert(false)
    } else if (type === "destroy"){
      removeActivity(activity)
      setDestroyAlert(false)

    }
  }


  console.log(activity)
  return (
    <div className="trip-card">
      {updateAlert ? (
        <Alert
          updateActivities = {updateActivities}
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
          updateActivities = {updateActivities}
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

      <FA name="trash"
        onClick={()=>{setDestroyAlert(true)}}
      />
      {activity.done ? (
        <FA name="check" />
      ) : (
        <FA
          name="eye"
          onClick={() => {
            setUpdateAlert(true)
          }}
        />
      )}
      <div
        className="card-picture"
        style={{ backgroundImage: `url(${activity.automatic_picture})` }}
      ></div>
      <div className="trip-card-info">
        <h3>{capitalize(activity.title)}</h3>
        <div className="trip-card-location-info">
          <FA name="map-pin" />
          <p className="location-info">{activity.location}</p>
        </div>
        <p className="small-text notes-info">{activity.notes}</p>
        <div className={`card-category ${activity.category}`}>
          {activity.category.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

export default TripCard
