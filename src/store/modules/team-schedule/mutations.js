export const UPDATE_META = (state, payload) => state.meta = payload

export const UPDATE_STATUS = (state, payload) => state.status = payload

export const SET_TEAM_SCHEDULE = (state, payload) => state.schedule = payload

export const PUSH_TEAM_SCHEDULE = (state, payload) => state.schedule = [...state.schedule, ...payload]

export const CLEAR_TEAM_SCHEDULE = state => state.schedule = []
// export const SET_TEAM_SCHEDULE = (state, payload) => state.schedule = payload