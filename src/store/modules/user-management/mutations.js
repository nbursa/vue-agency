export const USERS_UPDATED = (state, payload) => {
  state.users = payload
}

export const UPDATE_PROFILE = (state, payload) => {
  state.profile = payload
}


export const SET_UNREAD_COUNTER = (state) => {
  state.profile.unreadNotifications += 1
}

export const UPDATE_TWO_WAY_STATUS = (state, payload) => {
  state.profile.twoWayEnabled = payload
}