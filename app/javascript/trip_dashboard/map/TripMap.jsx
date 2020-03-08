import React, { Component, useEffect, useState, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'
import InfoWindow from './InfoWindow'
import TripCard from '../cards/TripCard'

const TripMap = ({ activitiesList, showActivity, removeActivity }) => {
  const googleMap = useRef(null)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [showCard, setShowCard] = useState(null)

  const cleanMarkers = (latLng) => {
    markers.forEach((m) => {
      m.setMap(null)
    })
  }

  const addMarkers = () => {
    const latLng = Object.keys(activitiesList).map((f) => [
      activitiesList[f].latitude,
      activitiesList[f].longitude
    ])
    const markersList = markers
    cleanMarkers(latLng)
    activitiesList.forEach((a) => {
      const newMarker = new google.maps.Marker({
        position: { lat: a.latitude, lng: a.longitude },
        map: map
      })
      const infowindow = new google.maps.InfoWindow({
        content: ''
      })
      newMarker.addListener(
        'click',
        function() {
          console.log(a)
          setShowCard(a)
          // const content = ReactDOMServer.renderToString(InfoWindow(a))
          // infowindow.setContent(content)
          // infowindow.open(map, newMarker)
        },
        { passive: true }
      )
      markersList.push(newMarker)
    })
    setMarkers(markersList)
  }

  useEffect(() => {
    addMarkers()
  }, [activitiesList])

  // useEffect(() => {
  //   if (map) {
  //     console.log(google.maps.event.trigger)
  //     setTimeout(() => {
  //       google.maps.event.trigger(map, 'resize', { passive: true })
  //     }, 1000)
  //   }
  // }, [])

  useEffect(() => {
    if (map) {
      if (activitiesList.length === 1) {
        addMarkers()
        map.setCenter({
          lat: activitiesList[0].latitude,
          lng: activitiesList[0].longitude
        })
      } else if (activitiesList.length > 1) {
        const bounds = new google.maps.LatLngBounds()
        const coordList = activitiesList.map(
          (a) => new google.maps.LatLng(a.latitude, a.longitude)
        )
        coordList.forEach((c) => bounds.extend(c))
        map.fitBounds(bounds)
        addMarkers()
      }
    }
  }, [map, activitiesList])

  useEffect((e) => {
    if (!map) {
      console.log('new')
      const newMap = new google.maps.Map(googleMap.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12,
        disableDefaultUI: true
      })
      setMap(newMap)
      addMarkers()
    }
  }, [])

  // const show = display ? 'block' : 'none'

  return (
    <div className="map-container">
      <div
        data-id={activitiesList.length}
        ref={googleMap}
        style={{ width: '100vw', height: '100%' }}
      />
      {showCard ? (
        <TripCard showActivity={showActivity} mapCard={true} activity={showCard} />
      ) : null}
    </div>
  )
}

export default TripMap
