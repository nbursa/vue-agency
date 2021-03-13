import User from "@/models/User"

export const LOGIN_USER = (state, token) => {
  state.user = User.from(token)
}

export const SET_USER = (state, user) => {
  state.user = user
}

export const LOGOUT_USER = state => {
  state.user = null
}
