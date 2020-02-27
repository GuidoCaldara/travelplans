import React, { useState, useEffect, useRef}  from 'react';
import { markActivityAsDone } from '../utils.js'
import './TripCard.scss'
var FA = require('react-fontawesome')

const TripCard = ({activity, user}) => {
  console.log('pp')
  const markAsComplete = (e) => {
    markActivityAsDone(activity, user)
  }

  console.log(activity)
  return (
    <div className="trip-card">
    <FA name="trash"/>
    {activity.done ? <FA name="check" onClick={markAsComplete}/>: <FA name="eye" onClick={markAsComplete}/>}
      <div className="card-picture" style={{'backgroundImage': `url(${activity.automatic_picture})`}}></div>
      <div className="trip-card-info">
        <h3>{activity.title.toUpperCase()}</h3>
        <div className="trip-card-location-info">
          <FA name="map-pin"/>
          <p>{activity.location}</p>
        </div>
        <p className="small-text">{activity.notes}</p>
        <div className={`card-category ${activity.category}`}>{activity.category.toUpperCase()}</div>
      </div>
    </div>
  )
}

export default TripCard