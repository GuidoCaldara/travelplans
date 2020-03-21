import React from 'react'
import ListImg from '../../images/list.svg'
import CompassImg from '../../images/compass.svg'
import CompletedImg from '../../images/completed.svg'
import HomeImg from '../../images/home.svg'
import AddImg from '../../images/add.svg'
import './Navtab.scss'

const Navtab = ({ setShowMap, setShowActivityForm, toggleList }) => {
  return (
    <div className="nav-container">
      <div className="add-activity-btn">
        <img
          src={AddImg}
          onClick={() => {
            setShowActivityForm(true)
          }}
        />
      </div>

      <div className="navtab-box">
        <div className="navtab-img-container">
          <img
            src={CompassImg}
            onClick={() => {
              setShowMap(true)
            }}
          />
          <span>Map</span>
        </div>
        <div className="navtab-img-container">
          <img
            src={ListImg}
            onClick={() => {
              toggleList(false)
            }}
          />
          <span>ToSee List</span>
        </div>
      </div>
      <div className="navtab-box">
        <div className="navtab-img-container">
          <img
            src={CompletedImg}
            onClick={() => {
              toggleList(true)
            }}
          />
          <span>Seen List</span>
        </div>
        <a href="/">
          <div className="navtab-img-container">
            <img src={HomeImg} />
            <span>Home</span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Navtab
