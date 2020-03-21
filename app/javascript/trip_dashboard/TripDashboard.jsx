import React, { useState, useEffect } from 'react'
import ActivityForm from './activity-form/ActivityForm'
import TripMap from './map/TripMap.jsx'
import TripCard from './cards/TripCard.jsx'
import Navtab from './navtab/Navtab.jsx'
import Spinner from './spinner/Spinner'
import DashboardHeader from './dashboardHeader/DashboardHeader'
import ActivityShowCard from './cards/ActivityShowCard'
import {
  getDashboardInfos,
  updateActivity,
  destroyActivity
} from '../trip_dashboard/utils'
import './TripDashboard.scss'
var FA = require('react-fontawesome')

const TripDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const [showDone, setShowDone] = useState(false)
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

  const updateActivityDone = (activity) => {
    updateActivity({ ...activity, done: !activity.done }, user).then((response) =>
      setTimeout(() => {
        showActivity()
      }, 100)
    )
    const newList = activitiesList.filter((a) => a.id !== activity.id)
    setActivitiesList([...newList, { ...activity, done: !activity.done }])
  }

  const removeActivity = (activity) => {
    destroyActivity(activity, user).then(() => {
      const activities = activitiesList.filter((a) => a.id !== activity.id)
      setActivitiesList(activities)
      setTimeout(() => {
        showActivity()
      }, 100)
    })
  }

  const toggleList = (done) => {
    setShowDone(done)
    setShowMap(false)
  }

  let page
  if (isLoading) {
    page = <Spinner />
  } else if (showActivityForm) {
    page = (
      <div className="dashboard-wrapper">
        <ActivityForm tripId={trip.id} user={user} closeForm={closeForm} />
      </div>
    )
  } else {
    page = (
      <div className="dashboard-wrapper">
        {zoomedActivity ? (
          <ActivityShowCard
            showActivity={showActivity}
            zoomedActivity={zoomedActivity}
            updateActivityDone={updateActivityDone}
            removeActivity={removeActivity}
            closeShowPage={showActivity}
            showDone={showDone}
            user={user}
            activity={zoomedActivity}
          />
        ) : null}

        <DashboardHeader
          title={trip.title}
          subtitle={`From ${trip.formatted_start_date} to ${trip.formatted_end_date}`}
        />
        {showMap ? null : (
          <div className="activity-list-header">
            {showDone ? (
              <h3>Places you've seen </h3>
            ) : (
              <h3>Your ToDo list in {trip.country_name} </h3>
            )}
          </div>
        )}

        <div className="trip-card-container">
          {showMap ? (
            <TripMap
              showActivity={showActivity}
              removeActivity={removeActivity}
              activitiesList={activitiesList}
              center={{lat: trip.latitude, lng: trip.longitude}}
              display={showMap}
            />
          ) : (
            activitiesList
              .filter((a) => a.done === showDone)
              .map((a, i) => (
                <TripCard
                  key={i}
                  removeActivity={removeActivity}
                  activity={a}
                  user={user}
                  showActivity={showActivity}
                />
              ))
          )}
        </div>
        <Navtab
          toggleList={toggleList}
          setShowActivityForm={setShowActivityForm}
          setShowMap={() => {
            setShowMap(true)
          }}
        />
      </div>
    )
  }
  return <div>{page}</div>
}

export default TripDashboard
