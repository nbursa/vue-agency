import * as repository from "./repository.js"

export const getJobRequest = ({ commit }, payload) => {
  commit("SET_TOKEN", payload.token)
  commit("SET_EMAIL", payload.email)
  repository
    .getRequest(payload)
    .then(jobRequest => {
      commit("SET_JOB_REQUEST", jobRequest)
    })
    .catch(err => {
      commit("SET_ERRORS", err.data.message)
    })
}

export const acceptJobs = ({ commit }, payload) => {
  let serializedLineGroups = ""
  payload.lineGroups.forEach((group, i) => {
    return serializedLineGroups += `&line_groups[${i}]=` + group
  })
  payload.serializedLineGroups = serializedLineGroups
  repository
    .accept(payload)
    .then(res => {
      return res
    })
    .catch(err => {
      let errors = []
      errors.push({ message: err.data.message || err.message })
      for (const [key, val] of Object.entries(err.data.errors)) {
        e.push({[key]: val[0]})
      }
      commit("SET_ERRORS", errors)
    })
}

export const rejectJobs = ({ commit }, payload) => {
  repository
    .reject(payload)
    .then(res => {
      return res
    })
    .catch(err => {
      let errors = []
      errors.push({ message: err.data.message || err.message })
      for (const [key, val] of Object.entries(err.data.errors)) {
        e.push({[key]: val[0]})
      }
      commit("SET_ERRORS", errors)
    })
}
