export const SET_USERS = (state, users) => {
  state.users = users
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

export const SET_SELECTED_USER = (state, user) => {
  state.selectedUser = user
}

export const UPDATE_SELECTED_USER = (state, value) => {
  state.selectedUser[value.name] = value.value
}

export const ADD_USER = (state, value) => {
  value.fullName = value.firstName + " " + value.lastName
  state.users.unshift(value)
}

export const DELETE_USER = (state, userId) => {
  state.users = state.users.filter(user => user.id !== userId)
}

export const UPDATE_USER = (state, user) => {
  const { id } = user
  let usr = state.users.find(item => item.id === id)

  Object.keys(usr).forEach(key => {
    if (usr[key] && user[key]) {
      usr[key] = user[key]
    }
  })

  usr.fullName = usr.firstName + " " + usr.lastName
}
