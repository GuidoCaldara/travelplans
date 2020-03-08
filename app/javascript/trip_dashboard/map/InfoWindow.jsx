import React from 'react';
import {capitalize} from '../utils'
var FA = require('react-fontawesome')

const InfoWindow = (a) =>{
  return (
    <div className="trip-card-infowindow">
      <div
        className="card-picture"
        style={{ backgroundImage: `url(${a.automatic_picture})` }}
      ></div>
      <div className="trip-card-info">
        <h3>{capitalize(a.title)}</h3>
        <div className="trip-card-location-info">
          <FA name="map-pin" />
          <p className="location-info">{a.location}</p>
        </div>
        <p className="small-text notes-info">{a.notes}</p>
        <div className={`card-category ${a.category}`}>
          {a.category.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

export default InfoWindow