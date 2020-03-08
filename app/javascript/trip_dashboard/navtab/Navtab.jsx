import React from 'react'
import ListImg from '../../images/list.svg'
import CompassImg from '../../images/compass.svg'
import HomeImg from '../../images/home.svg'
import FriendsImg from '../../images/Friends.svg'
import AddImg from '../../images/add.svg'
import './Navtab.scss'

const Navtab = ({ setShowMap, setShowActivityForm }) => {
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
              setShowMap(false)
            }}
          />
          <span>ToSee List</span>
        </div>
      </div>
      <div className="navtab-box">
        <div className="navtab-img-container">
          <img src={HomeImg} />
          <span>Home</span>
        </div>
        <div className="navtab-img-container">
          <img src={FriendsImg} />
          <span>Friends</span>
        </div>
      </div>
    </div>
  )
}

export default Navtab

// <div className="">
// <img
//   src=""

// />
// </div>
