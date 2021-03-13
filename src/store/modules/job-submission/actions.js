import * as repository from "./repository.js"

export const updateFieldValue = ({ commit }, field) => {
  commit("UPDATE_FIELD_VALUE", field)
}

export const setJobTabs = ({ commit }) => {
  commit("SET_JOBS")
}

export const clearCandidatesList = ({ commit }) => {
  commit("CLEAR_CANDIDATES")
}

export const findCandidates = ({ commit }, params) => {
  commit("SET_FETCHING", true)
  repository
    .getCandidates(params)
    .then(candidates => {
      commit("SET_FETCHING", false)
      commit("SET_CANDIDATES", candidates.data)
    })
    .catch(e => {
      commit("SET_FETCHING", false)
      commit("SET_CANDIDATES", [])
    })
}

export const saveJob = ({ commit }, job) => {
  commit("SET_STATUS", false)
  repository
    .saveJob(job)
    .then(() => {
      commit("SET_STATUS", true)
      commit("RESET_JOB")
    })
    .catch(e => {
      commit("SET_ERRORS", e.data.errors)
      console.log(e)
    })
}

export const updateJobStartTime = ({ commit }, options) => {
  commit("SET_JOB_START_TIME", options)
}

export const updateJobEndTime = ({ commit }, options) => {
  commit("SET_JOB_END_TIME", options)
}

export const deleteJob = ({ commit }, options) => {
  commit("DELETE_JOB", options)
}

export const resetJob = ({ commit }, options) => {
  commit("RESET_JOB")
}

export const resetGeneratedJobs = ({ commit }) => {
  console.log("RESET CHECK")
  commit("RESET_GENERATED_JOBS")
}