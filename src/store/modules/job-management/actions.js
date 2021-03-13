import * as repository from "@/store/modules/job-management/repository"
import { DateUtils } from "luxon"

export const fetchJobs = ({ commit }, options) => {
  const filterOptions = [
    "filled",
    "unfilled",
    "in_progress",
    "finished",
    "lost"
  ]

  // if (options && options.group && filterOptions.includes(options.group)) {
  //   options.orderBy = "start_time"
  //   options.sortBy = "asc"
  // }

  commit("UPDATE_STATUS", true)
  repository
    .all(options)
    .then(jobs => {
      commit("UPDATE_STATUS", false)
      commit("UPDATE_JOBS", jobs.data)
      jobs.meta 
      ? commit("UPDATE_META_DATA", jobs.meta)
      : null
    })
    .catch(e => {
      console.log(e)
      // commit("SET_ERRORS", e.data.errors)
    })
}

export const fetchJob = ({ commit, dispatch }, jobId) => {
  dispatch("edit/isFetching", true)
  return repository
    .get(jobId)
    .then(job => {
      dispatch("edit/setFormItem", job)
      dispatch("edit/isFetching", false)
      return job
    })
    .catch(e => {
      console.log(e)
    })
}

export const fetchJobLogs = ({ commit, dispatch }, jobId) => {
  return repository
    .getJobLogs(jobId)
    .then(job => {
      commit("UPDATE_JOB_LOG", job)
    })
    .catch(e => {
      console.log(e)
    })
}


export const fetchJobRequest = ({ commit, dispatch }, payload) => {
  const { jobId, withLocation = false } = payload
  return repository
    .getJobRequest(jobId)
    .then(data => {
      const jobRequestId = data.jobRequest.id
      if (withLocation) {
        commit("UPDATE_CLIENT_LOCATIONS", {
          lat: parseFloat(data.geoLocation.latitude),
          lng: parseFloat(data.geoLocation.longitude)
        })
        commit("UPDATE_JOB_LOCATION", data)
      }
      return Promise.resolve(jobRequestId)
    })
    .catch(e => {
      Promise.reject()
      console.log(e)
    })
}

export const fetchClientLocation = ({ commit, dispatch }, client) => {
  const { address, id } = client
  return repository
    .geoloc(address)
    .then(locations => {
      commit("UPDATE_CLIENT_LOCATIONS", { locations, id })
      Promise.resolve()
    })
    .catch(e => {
      Promise.reject(e)
    })
}

export const cancelJob = ({ commit, dispatch }, options) => {
  dispatch("edit/isFetching", true)
  repository
    .cancel(options.id)
    .then(res => {
      dispatch("edit/isFetching", false)
      dispatch("edit/itemDeleted", true)
      dispatch("table/deselectItem", options)
      const t = {
        jobId: options.id,
        status: res.status
      }
      commit("UPDATE_JOB_STATUS", t)
    })
    .catch(e => {
      dispatch("edit/isFetching", false)
      dispatch("edit/setErrors", e.data.errors)
    })
}

export const updateJob = ({ commit, dispatch }, options) => {
  dispatch("edit/isFetching", true)
  //bonusappendix
  const formatOptions = Object.assign({}, options, {bonuses: options.bonuses.map(bonus => bonus.id)})
  return repository
    .update(formatOptions)
    .then(res => {
      dispatch("edit/isFetching", false)
      dispatch("edit/itemSaved", true)
      dispatch("edit/isSignOff", false)
      dispatch("table/deselectItem", options)
      commit("UPDATE_JOB", options)
      return Promise.resolve()
    })
    .catch(e => {
      console.log("JOB UPDATE ERRORZ", e)
      dispatch("edit/isFetching", false)
      dispatch("edit/setErrors", e.data.errors.length > 0 ? e.data.errors : {error: e.data.message})
    })
}

export const signOffJob = ({ commit, dispatch }, options) => {
  dispatch("edit/isFetching", true)
  return repository
    .signOffJob(options)
    .then(res => {
      dispatch("edit/isFetching", false)
      dispatch("edit/itemSaved", true)
      dispatch("edit/isSignOff", true)
      commit("SIGN_OFF_JOB", res)
      return Promise.resolve()
    })
    .catch(e => {
      console.log("JOB UPDATE ERRORZ", e)
      dispatch("edit/isFetching", false)
      dispatch("edit/setErrors", e.data.errors.length > 0 ? e.data.errors : {error: e.data.message})
    })
}


export const getJobsByRequestId = ({ commit}, requestId) => {
  return repository
    .getJobsByRequestId(requestId)
    .then(data => {
      return Promise.resolve(data)
    })
    .catch(e => Promise.reject(e))
}

export const fetchJobForRepush = ({ commit, dispatch }, jobId) => {
  return repository
    .fetchJobForRepush(jobId)
    .then(job => {
      return Promise.resolve(job)
    })
    .catch(e => Promise.reject(e))
}

export const repushJobs = ({ commit}, requestId) => {
  return repository
    .repushJobs(requestId)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(e => Promise.reject(e))
}
