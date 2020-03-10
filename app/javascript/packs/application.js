import TripDashboard from '../trip_dashboard/TripDashboard'

import ReactDOM from 'react-dom'
import React from 'react'
require('dotenv').config()
require('@rails/ujs').start()
require('@rails/activestorage').start()
require('channels')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(
      function(registration) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      }
    )
  })
}

const dashBoard = document.querySelector('#trip-dashboard')
if (dashBoard) {
  ReactDOM.render(<TripDashboard tripId={dashBoard.dataset.id} />, dashBoard)
}
