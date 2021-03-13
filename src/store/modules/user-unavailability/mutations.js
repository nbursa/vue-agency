export const SET_USER_REQUESTS = (state, documents) => {
  state.userRequests = documents
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

export const REMOVE_REQUEST = (state, options) => {
  state.userRequests = state.userRequests.filter(item => item.id !== options.id)
}
