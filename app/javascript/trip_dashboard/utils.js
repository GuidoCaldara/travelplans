const capitalize = (lower) => lower.replace(/^\w/, (c) => c.toUpperCase())

const buildActivity = (activity) => {
  return {
    activity: {
      title: activity.activityTitle,
      notes: activity.activityNotes,
      automatic_picture: activity.activityPicture,
      latitude: activity.activityLatitude,
      longitude: activity.activityLongitude,
      location: activity.activityLocation,
      category: activity.activityCategory
    }
  }
}

const saveActivity = async (user, tripId, activity) => {
  const activityObj = buildActivity(activity)
  const url = `/api/v1/trips/${tripId}/activities`
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': user.email,
      'X-User-Token': user.token
    },
    body: JSON.stringify(activityObj)
  })
  const response = await request.json()
  return response
}

const updateActivity = async (activity, user) => {
  const url = `/api/v1/activities/${activity.id}`
  const request = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': user.email,
      'X-User-Token': user.token
    },
    body: JSON.stringify(activity)
  })
  const response = await request.json()
  return response
}

const destroyActivity = async (activity, user) => {
  const url = `/api/v1/activities/${activity.id}`
  const request = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': user.email,
      'X-User-Token': user.token
    }
  })
  return request
}

const getDashboardInfos = async (id) => {
  const responses = await Promise.all([
    fetch(`/api/v1/trips/${id}`),
    fetch(`/api/v1/is_logged_in`),
    fetch(`/api/v1/trips/${id}/activities`)
  ])
  const data = await Promise.all(responses.map((r) => r.json()))
  return data
}

export {
  capitalize,
  saveActivity,
  getDashboardInfos,
  updateActivity,
  destroyActivity
}
