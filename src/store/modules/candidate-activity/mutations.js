export const UPDATE_CANDIDATE_ACTIVITY = (state, payload) => {
  state.candidateActivity = payload.data
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
