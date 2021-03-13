export const SET_LOCATION_ADMINS = (state, locationAdmins) => {
  locationAdmins.forEach(admin => {
    admin.clientNames = ''
    admin.clients.forEach(client => {
      admin.clientNames += client.name + ', '
    })
    admin.clientNames = admin.clientNames.substring(0, admin.clientNames.length - 2)
  })
  state.locationAdmins = locationAdmins
}

export const UPDATE_META_DATA = (state, meta) => {
  state.meta = meta.pagination
}

export const UPDATE_STATUS = (state, newStatus) => {
  state.status = newStatus
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}

export const SET_SELECTED_LOCATION_ADMIN = (state, user) => {
  state.selectedLocationAdmin = user
}

export const UPDATE_SELECTED_LOCATION_ADMIN = (state, value) => {
  state.selectedLocationAdmin[value.name] = value.value
}

export const ADD_LOCATION_ADMIN = (state, value) => {
  value.fullName = value.firstName + " " + value.lastName
  state.locationAdmins.unshift(value)
}

export const DELETE_USER = (state, userId) => {
  state.locationAdmins = state.locationAdmins.filter(
    locationAdmins => locationAdmins.id !== userId
  )
}

export const UPDATE_LOCATION_ADMIN = (state, user) => {
  const { id } = user
  let usr = state.locationAdmins.find(item => item.id === id)
  Object.keys(usr).forEach(key => {
    if (usr[key] !== undefined && user[key] !== undefined) {
      usr[key] = user[key]
    }
  })

  usr.fullName = usr.firstName + " " + usr.lastName
}
