import React, { useState, useEffect, useRef}  from 'react';
import './TripCard.scss'
var FA = require('react-fontawesome')

const TripCard = ({activity}) => {
  return (
    <div className="trip-card">
    <FA name="trash"/>
      <div className="card-picture" style={{'background-image': `url(${activity.automatic_picture})`}}></div>
      <div className="trip-card-info">
        <h3>{activity.title.toUpperCase()}</h3>
        <div className="trip-card-location-info">
          <FA name="map-pin"/>
          <p>{activity.location}</p>
        </div>
        <p className="small-text">{activity.notes}</p>
        <div className={`card-category ${activity.category}`}>{activity.category}</div>
      </div>
    </div>
  )
}

export default TripCard