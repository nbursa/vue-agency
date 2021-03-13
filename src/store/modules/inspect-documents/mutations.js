export const SET_DOCUMENTS = (state, payload) => {
    state.documents = payload
}

export const UPDATE_DOCUMENTS_META = (state, payload) => state.meta = payload.pagination

export const UPDATE_STATUS = (state, payload) => {
    state.status = payload
}

export const IS_FETCHING = (state, payload) => state.status = payload