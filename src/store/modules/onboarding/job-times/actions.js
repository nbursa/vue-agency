import * as repository from './repository'
import { submitFormatter } from './submitFormatter'
import { checkSegments } from './segmentDiff'

export const getJobTimes = ({ dispatch }) => {
  // dispatch("getJobTimesScheduled").then(() => {
  //   if (state.jobtimes.length === 0) {
  //     dispatch("getJobTimesLive")
  //   }
  // })
  dispatch('getJobTimesLive')
}

export const getJobTimesLive = ({ commit }) => {
  return repository
    .fetchJobTimesLive()
    .then((jobtimes) => {
      commit('JOB_TIMES_UPDATED', jobtimes)
      commit('JOB_TIME_SET_DEFAULT', jobtimes)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('error', error)
    })
}

export const getJobTimesDefault = ({ commit }) => {
  return repository
    .fetchJobTimesLive()
    .then((jobtimes) => {
      commit('JOB_TIME_SET_DEFAULT', jobtimes)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('error', error)
    })
}

export const getJobTimesActive = ({ commit }) => {
  return repository
    .fetchJobTimesLive()
    .then((jobtimes) => {
      commit('JOB_TIMES_SET_ACTIVE', jobtimes)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('error', error)
    })
}

export const getJobTimesScheduled = ({ commit }) => {
  return repository
    .fetchJobTimesScheduled()
    .then((jobtimes) => {
      commit('JOB_TIMES_UPDATED', jobtimes)
      commit('JOB_TIME_SET_DEFAULT', jobtimes)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('error', error)
    })
}

export const updateJobTimes = ({ commit }, payload) => {
  // console.log("updated", payload)
  return commit('JOB_TIMES_UPDATED', payload)
}

export const updateJobTime = ({ commit }, payload) => {
  // eslint-disable-next-line no-console
  console.log('single update', payload)
  return commit('JOB_TIME_UPDATE', payload)
}

export const submitJobTimes = ({ commit, state }) => {
  const formattedPayload = submitFormatter(state.jobtimes, state.selectedClient)
  return repository
    .createJobTimes(formattedPayload)
    .then((jobTimes) => {
      if (!state.selectedClient) commit('JOB_TIME_SET_DEFAULT', jobTimes)
      commit('JOB_TIMES_UPDATED', jobTimes)
      return Promise.resolve()
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const activateJobTimes = (date) => {
  return repository
    .publishJobTimes(date)
    .then(() => {
      return Promise.resolve()
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const submitManager = ({ state, dispatch }, publishTime = null) => {
  const doAction = checkSegments(state.jobtimes, state.jobtimesdefault)
  // eslint-disable-next-line no-console
  console.log(doAction)

  //temp

  if (doAction === 'POST') return dispatch('submitJobTimes')
  if (doAction === 'SKIP') return Promise.resolve()
}

export const selectClientJobTimes = ({ commit }, payload) => {
  commit('SET_CLIENT_JOB_TIMES', payload)
}

export const resetJobTime = ({ commit }) => {
  // console.log("reset action")
  return commit('JOB_TIME_RESTORE_DEFAULT')
}
