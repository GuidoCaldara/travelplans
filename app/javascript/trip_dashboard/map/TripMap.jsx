import React, { Component, useEffect, useState, useRef } from 'react';

const TripMap = ({activitiesList, display}) => {
  const googleMap = useRef(null);
  const [map, setMap] = useState(null);

  const addMarkers = () => {
    activitiesList.forEach(a => new google.maps.Marker({position: {lat: a.latitude, lng: a.longitude}, map: map}) )
  }

  useEffect(() => {
    addMarkers()
  }, [activitiesList])


   useEffect(() => {
    if (map) {
      const bounds = new google.maps.LatLngBounds();
      const coordList = activitiesList.map( a => new google.maps.LatLng( a.latitude, a.longitude ) )
      coordList.forEach( c => bounds.extend(c) )
      map.fitBounds(bounds);
      addMarkers()
      }
  }, [map, activitiesList]);

  useEffect((e)=>{
    if (!map){
      console.log('new')
      const newMap = new google.maps.Map(googleMap.current, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 18,
        disableDefaultUI: true
      });
      setMap(newMap)
  
    }
  }, [])

  const show = display ? 'block' : 'none'

  return(
    <div className="map-container">
      <div
      data-id={activitiesList.length}
      ref={googleMap}
      style={{width: '100vw', height: '100vh', 'display' : show }}
      />
    </div>
  )
}

export default TripMap;
