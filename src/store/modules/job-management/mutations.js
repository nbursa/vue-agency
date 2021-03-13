import Vue from "vue"

export const UPDATE_JOBS = (state, jobs) => {
  state.jobs = jobs
}

export const UPDATE_META_DATA = (state, meta) => {
  state.meta = meta.pagination
}

export const UPDATE_STATUS = (state, newStatus) => {
  state.status = newStatus
}

export const UPDATE_JOB_LOCATION = (state, payload) => {
  state.jobLocation = payload
}

export const UPDATE_JOB_LOG = (state, payload) => {
  state.jobLog = payload
}

export const UPDATE_CLIENT_LOCATIONS = (state, location) => {
  state.clientLocations = location
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}

export const UPDATE_LOCATIONS = (state, job) => {
  state.job = job
}

export const UPDATE_JOB_STATUS = (state, options) => {
  let j = state.jobs.find(item => item.id === options.jobId)
  if (j) {
    j.status = options.status
  }
}

export const UPDATE_JOB = (state, options) => {
  state.jobs.forEach((item, index) => {
    if (item.id === options.id) {
      Vue.set(state.jobs, index, options)
    }
  })
}

export const SIGN_OFF_JOB = (state, options) => {
  state.jobs.forEach((item, index) => {
    if (item.id === options.id) {
      Vue.set(state.jobs, index, options)
    }
  })
}
