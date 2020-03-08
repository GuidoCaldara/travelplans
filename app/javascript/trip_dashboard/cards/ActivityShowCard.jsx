import React, { useState, useEffect, user } from 'react'
import './ActivityShowCard.scss'
import Alert from '../alert/Alert.jsx'
import DashboardHeader from '../dashboardHeader/DashboardHeader'
const FA = require('react-fontawesome')

const ActivityShowCard = ({
  activity,
  updateActivityDone,
  removeActivity,
  zoomedActivity,
  showActivity
}) => {
  const [updateAlert, setUpdateAlert] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)

  return (
    <div className="show-activity-card-wrapper">
      <DashboardHeader
        title={zoomedActivity.title}
        subtitle={zoomedActivity.location}
        button={
          <FA className="close-show-icon" name="times" onClick={showActivity} />
        }
      />

      {updateAlert ? (
        <Alert
          confirmAlert={updateActivityDone}
          activity={activity}
          title="Confirm?"
          dismiss={() => {
            setUpdateAlert(false)
          }}
          subtitle={`Mark ${activity.title} as seen?`}
        />
      ) : null}
      {deleteAlert ? (
        <Alert
          confirmAlert={removeActivity}
          activity={activity}
          alertType="update"
          title="Are you sure?"
          dismiss={() => {
            setDeleteAlert(false)
          }}
          subtitle={`Delete ${activity.title} from your list?`}
        />
      ) : null}

      <img className="activity-show-img" src={activity.automatic_picture} />
      <div className="activity-description-box">
        <h3>Description</h3>
        <p>{activity.notes}</p>
      </div>
      <button
        onClick={() => {
          setUpdateAlert(true)
        }}
        className={`btn btn-primary ${activity.done ? 'white-btn' : null}`}
      >
        <FA name="eye" />
        {activity.done ? 'Move the activity back in ToSee' : 'Mark as seen'}
      </button>
      <button
        onClick={() => {
          setDeleteAlert(true)
        }}
        className="btn btn-light"
      >
        <FA name="trash" /> Delete
      </button>
    </div>
  )
}

export default ActivityShowCard

// const updateActivities = (type) => {
//   if (type === 'update') {
//     activity.done = true
//     setUpdateAlert(false)
//   } else if (type === 'destroy') {
//     removeActivity(activity)
//     setDestroyAlert(false)
//   }
// }

// const confirmAlert = (currentUser, activity) => {
//   setDisplayConfirmIcon(true)
//   if (alertType === 'update') {
//     updateActivityDone(activity, currentUser).then((response) =>
//       setTimeout(() => {
//         updateActivities('update')
//         closeShowPage()
//       }, 800)
//     )
//   } else if (alertType === 'destroy') {
//     destroyActivity(activity, currentUser).then((response) =>
//       setTimeout(() => {
//         updateActivities('destroy')
//       }, 800)
//     )
//   }
// }
