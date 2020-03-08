import React from 'react';
import './DashboardHeader.scss'

const DashboardHeader = ({title, subtitle, button}) =>{
  return(
    <div className="dashboard-header">
      <div className="trip-info">
        {button}
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export default DashboardHeader