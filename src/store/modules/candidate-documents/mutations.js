export const IS_FETCHING = (state, payload) => state.status = payload

export const SET_ALL_CANDIDATES = (state, payload) => state.candidates = payload

export const UPDATE_CANDIDATES_META = (state, payload) => state.meta = payload.pagination

export const UPDATE_STATUS = (state, payload) => {
  state.status = payload
}

export const SET_SELECTED_DOCUMENT = (state, payload) => {
  state.selectedDocument = payload
}