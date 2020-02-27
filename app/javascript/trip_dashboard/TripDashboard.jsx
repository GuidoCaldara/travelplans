import React, { useState, useEffect }  from 'react'
import ActivityForm from './activity-form/ActivityForm'
import TripMap from './map/TripMap.jsx'
import TripCard from './cards/TripCard.jsx'
import {getDashboardInfos} from '../trip_dashboard/utils'
import './TripDashboard.scss'
var FA = require('react-fontawesome')

const TripDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMap, setShowMap] = useState(true)
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [user, setUser] = useState(null);
  const [activitiesList, setActivitiesList] = useState([]);
  const [trip, setTrip] = useState({});

  useEffect(() => {
    getDashboardInfos(props.tripId).then((data) => {
      setTrip(data[0])
      setUser(data[1])
      setActivitiesList(data[2])
    }).then((x) => setIsLoading(false))
  }, []);

  const closeForm = (e, activity = null) => {
    setShowActivityForm(false)
    if (activity){
      setActivitiesList([...activitiesList, activity]);
    }
  }
  console.log(activitiesList)
  return (
    <div className="">
        { showActivityForm ? 
          <ActivityForm
            tripId= {trip.id}
            user = {user}
            closeForm={closeForm}
          /> 
          : null
        }
        <div className="dashboard-header">
          <div className="trip-info">
            <h1>{trip.title}</h1>
            <p>From {trip.formatted_start_date} to {trip.formatted_end_date}</p>
          </div>
          <div className="dashboard-navtab">
            <div><FA name="map" onClick={() => {setShowMap(true)}}/></div>
            <div><FA name="list" onClick={() => {setShowMap(false)}}/></div>
          </div>
        </div>
        -
        <div className="trip-card-container">
          {activitiesList.map((a,i) => <TripCard key={i} activity={a} user={user}/>)}
        </div>
        <button 
          className="btn btn-primary form-btn"
          onClick={()=>{setShowActivityForm(true)} }
          >
          <FA name="plus"/>
        </button>
    </div>
  )
}


export default TripDashboard


// { showMap && activitiesList ? <TripMap activitiesList={activitiesList}/> : 
//  }

// <TripMap activitiesList={activitiesList} display={showMap}/>