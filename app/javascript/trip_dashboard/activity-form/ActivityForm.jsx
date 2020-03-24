import React, { useState, useEffect, useRef } from 'react'
import './ActivityForm.scss'
import { saveActivity } from '../utils.js'
import DashboardHeader from '../dashboardHeader/DashboardHeader.jsx'
import OptionBtn from './OptionBtn'
import 'react-select2-wrapper/css/select2.css'

const FA = require('react-fontawesome')

const ActivityForm = (props) => {
  let autocompleteField = null
  const autocomplete = useRef('autocomplete')
  const [errors, setErrors] = useState([])
  const [activityTitle, setActivityTitle] = useState('')
  const [activityPicture, setActivityPicture] = useState('')
  const [activityLocation, setActivityLocation] = useState('')
  const [activityLatitude, setActivityLatitude] = useState(null)
  const [activityLongitude, setActivityLongitude] = useState(null)
  const [activityCategory, setActivityCategory] = useState('')
  const [activityNotes, setActivityNotes] = useState('')
  const [trip, setTrip] = useState({})

  const onChange = (e, func) => {
    const value = e.target.value
    func(value)
  }

  const options = [
    { value: 'art', label: 'ART' },
    { value: 'nature', label: 'NATURE' },
    { value: 'monument', label: 'MONUMENT' },
    { value: 'food', label: 'FOOD' },
    { value: 'museum', label: 'MUSEUM' },
    { value: 'shop', label: 'SHOP' },
  ]

  const selectCategory = (e) =>{
    const category = e.target.dataset.value
    setActivityCategory(category)
  }

  const handlePlaceSelect = () => {
    const place = autocompleteField.getPlace()
    if (place.photos && place.photos[0]) setActivityPicture(place.photos[0].getUrl())
    setActivityLocation(place.name)
    setActivityLatitude(place.geometry.location.lat())
    setActivityLongitude(place.geometry.location.lng())
  }

  useEffect(() => {
    autocompleteField = new google.maps.places.Autocomplete(autocomplete.current, {})
    autocompleteField.addListener('place_changed', handlePlaceSelect)
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const activity = {
      activityTitle,
      activityLocation,
      activityLongitude,
      activityLatitude,
      activityNotes,
      activityPicture,
      activityCategory
    }
    saveActivity(props.user, props.tripId, activity).then((data) => {
      console.log(data)
      if (data.errors) {
        setErrors(data.errors)
      } else {
        props.closeForm(null, data)
      }
    })
  }

  return (
    <div className="form-background">
     <h3 className="form-title">Add a ToSee</h3>
      {activityCategory.label}
      <FA
        className="close-form-icon"
        name="times"
        onClick={(e) => {
          props.closeForm(e)
        }}
      />
      <div className="activity-form-card">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Activity title</label>
            <input
              value={activityTitle}
              onChange={(e) => {
                onChange(e, setActivityTitle)
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Activity location</label>
            <input
              ref={autocomplete}
              type="text"
              className="form-control"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Activity notes</label>
            <textarea
              onChange={(e) => {
                onChange(e, setActivityNotes)
              }}
              style={{'height': '150px'}}
              className="form-control"
              id=""
              rows="6"
            ></textarea>
          </div>
          <h3 className="select-category-title">Select a category</h3>
          <div className="category-select-group-box">
          {options.map((o, i) => <OptionBtn handleClick={selectCategory} selected={o.value === activityCategory } key={i} name={o.value}/>)}
          </div>
          <button className="btn btn-primary float-right" type="submit">Confirm</button>
        </form>
      </div>
    </div>
  )
}

export default ActivityForm
