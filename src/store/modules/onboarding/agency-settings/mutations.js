export const UPDATE_PROFILE = (state, payload) => {
  state.profile = payload
}

export const UPDATE_AGENCY_PROFILE = (state, payload) => {
  state.profile[payload.key] = payload.value
}

export const UPDATE_LANGUAGES = (state, payload) => {
  state.languages = payload
}

