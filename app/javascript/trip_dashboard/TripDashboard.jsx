import React, { useState, useEffect } from 'react'
import ActivityForm from './activity-form/ActivityForm'
import TripMap from './map/TripMap.jsx'
import Alert from './alert/Alert.jsx'
import TripCard from './cards/TripCard.jsx'
import Navtab from './navtab/Navtab.jsx'
import DashboardHeader from './dashboardHeader/DashboardHeader'
import ActivityShowCard from './cards/ActivityShowCard'
import { getDashboardInfos } from '../trip_dashboard/utils'
import './TripDashboard.scss'
var FA = require('react-fontawesome')

const TripDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [user, setUser] = useState(null)
  const [zoomedActivity, setZoomedActivity] = useState(null)
  const [activitiesList, setActivitiesList] = useState([])
  const [trip, setTrip] = useState({})

  useEffect(() => {
    getDashboardInfos(props.tripId)
      .then((data) => {
        setTrip(data[0])
        setUser(data[1])
        setActivitiesList(data[2])
      })
      .then((x) => setIsLoading(false))
  }, [])

  const closeForm = (e, activity = null) => {
    setShowActivityForm(false)
    if (activity) {
      setActivitiesList([...activitiesList, activity])
    }
  }

  const showActivity = (activity) => {
    if (zoomedActivity) {
      setZoomedActivity(null)
    } else {
      setZoomedActivity(activity)
    }
  }

  const removeActivity = (activity) => {
    const activities = activitiesList.filter((a) => a.id !== activity.id)
    setActivitiesList(activities)
  }

  let page
  if (showActivityForm) {
    page = (
      <div className="dashboard-wrapper">
        <ActivityForm tripId={trip.id} user={user} closeForm={closeForm} />
      </div>
    )
  } else if (zoomedActivity) {
    page = (
      <div className="dashboard-wrapper">
        <DashboardHeader
          title={zoomedActivity.title}
          subtitle={zoomedActivity.location}
          button={
            <FA className="close-show-icon" name="times" onClick={showActivity} />
          }
        />
        <ActivityShowCard
          closeShowPage={showActivity}
          user={user}
          activity={zoomedActivity}
        />
      </div>
    )
  } else {
    page = (
      <div className="dashboard-wrapper">
        <DashboardHeader
          title={trip.title}
          subtitle={`From ${trip.formatted_start_date} to ${trip.formatted_end_date}`}
        />
        <div className="activity-list-header">
          <h3>Your ToDo list in {trip.country} </h3>
        </div>
        <div className="trip-card-container">
          <TripMap
            user="user"
            removeActivity={removeActivity}
            activitiesList={activitiesList}
            display={showMap}
          />
          {activitiesList.filter(a =>!a.done).map((a, i) => (
            <TripCard
              key={i}
              removeActivity={removeActivity}
              activity={a}
              user={user}
              showActivity={showActivity}
            />
          ))}
          <div className="activity-list-header">
          <h3>Places you've seen </h3>
        </div>
        {activitiesList.filter(a => a.done).map((a, i) => (
          <TripCard
            key={i}
            removeActivity={removeActivity}
            activity={a}
            user={user}
            showActivity={showActivity}
          />
        ))}

        </div>
        <Navtab setShowActivityForm={setShowActivityForm} setShowMap={setShowMap} />
      </div>
    )
  }

  return <div>{page}</div>
}

export default TripDashboard
