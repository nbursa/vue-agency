export const UPDATE_META = (state, payload) => state.meta = payload

export const UPDATE_STATUS = (state, payload) => state.status = payload

export const SET_CLIENT_SCHEDULE = (state, payload) => state.schedule = payload

export const PUSH_CLIENT_SCHEDULE = (state, payload) => state.schedule = [...state.schedule, ...payload]

export const UPDATE_CANDIDATE_LIST = (state, payload) => state.candidates = payload

export const CLEAR_CANDIDATE_LIST = (state) => state.candidates = []

export const UPDATE_CANDIDATE_STATUS = (state, payload) => state.candidateStatus = payload

export const SET_CANDIDATE_ERROR = (state, payload) => state.candidateError = payload

export const UPDATE_WORKER_LIST = (state, payload) => state.workers = payload

