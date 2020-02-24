import TripDashboard from '../trip_dashboard/TripDashboard'
import ReactDOM from 'react-dom';
import React from 'react';
require('dotenv').config()
require("@rails/ujs").start()
require("@rails/activestorage").start()
require("channels")



const dashBoard = document.querySelector('#trip-dashboard')
ReactDOM.render(
  <TripDashboard tripId={dashBoard.dataset.id}/>,
  dashBoard
)
