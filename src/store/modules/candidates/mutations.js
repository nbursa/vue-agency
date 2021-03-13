import Candidate from '@/models/Candidate.js'

export const UPDATE_CANDIDATES = (state, documents) => {
  state.candidates = documents.data
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

export const SET_SELECTED_CANDIDATE = (state, candidate) => {
  state.selectedCandidate = candidate
}

export const UPDATE_SELECTED_CANDIDATE = (state, value) => {
  state.selectedCandidate[value.name] = value.value
}

export const ADD_CANDIDATE = (state, value) => {
  value.fullName = value.firstName + ' ' + value.lastName
  state.candidates.unshift(value)
}

export const UPDATE_CANDIDATE = (state, candidate) => {
  const { id } = candidate
  let cand = state.candidates.find((item) => item.id === id)
  Object.keys(cand).forEach((key) => {
    cand[key] = candidate[key]
  })
  cand.fullName = cand.firstName + ' ' + cand.lastName
}

export const SET_UPDATE_CANDIDATE_STATUS = (state, status) => {
  state.candidateUpdated = status
}

export const ADD_SELECTED_JOB_TYPE = (state, jobType) => {
  state.selectedCandidate.jobTypes.push(jobType)
}

export const REMOVE_SELECTED_JOB_TYPE = (state, jobType) => {
  state.selectedCandidate.jobTypes = state.selectedCandidate.jobTypes.filter(
    (item) => item.id != jobType.id
  )
}

export const DELETE_CANDIDATE = (state, candidateId) => {
  state.candidates = state.candidates.filter((item) => item.id != candidateId)
}

export const RESET_CANDIDATE = (state) => {
  state.selectedCandidate = Object.assign({}, Candidate)
}
export const CLEAR_ERRORS = (state, errors) => {
  state.errors = []
}

export const CLEAR_CANDIDATES = (state) => (state.candidates = [])
