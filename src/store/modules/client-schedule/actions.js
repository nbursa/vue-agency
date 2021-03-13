import * as repository from './repository'
import ScheduledJob from '@/models/ScheduledJob'
import { generateTree } from '@/utils/general'

export const getClientSchedule = async ({ commit }, options) => {
  commit('UPDATE_STATUS', true)
  try {
    const response = await repository.all(options)
    commit('SET_CLIENT_SCHEDULE', generateTree(response.data))
    commit('UPDATE_META', response.meta)
    commit('UPDATE_STATUS', false)
  } catch (e) {
    commit('UPDATE_STATUS', false)
    return Promise.reject(e)
  }
}

export const getClientScheduleLazy = async ({ commit }, options) => {
  try {
    const response = await repository.all(options)
    commit('PUSH_CLIENT_SCHEDULE', generateTree(response.data))
    commit('UPDATE_META', response.meta)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getClientJobs = async ({ commit, dispatch, state }, options) => {
  dispatch('edit/isFetching', true)
  try {
    let opt = Object.assign({}, options, {
      query: {
        dateFrom: state.search.params.dateFrom,
        dateTo: state.search.params.dateTo
      }
    })
    const response = await repository.fetchClientJobs(opt)
    const clientJobs = response.map(job => {
      let { id, status, startTime, endTime, user, jobRequest } = job
      return new ScheduledJob({
        jobId: id,
        status: status,
        startTime: startTime,
        endTime: endTime,
        candidate: user,
        jobType: jobRequest.jobType
      })
    })

    dispatch('edit/setFormItem', clientJobs)
    dispatch('edit/isFetching', false)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getClientWorkers = async ({ commit, state }, options) => {
  commit('UPDATE_CANDIDATE_STATUS', true)
  commit('SET_CANDIDATE_ERROR', {})
  try {
    let opt = Object.assign({}, options, {
      query: {
        dateFrom: state.search.params.dateFrom,
        dateTo: state.search.params.dateTo
      }
    })
    const response = await repository.fetchClientWorkers(opt)
    commit('UPDATE_WORKER_LIST', response)
  } catch (e) {
    commit('SET_CANDIDATE_ERROR', e)
    return Promise.reject(e)
  } finally {
    commit('UPDATE_CANDIDATE_STATUS', false)
  }
}

export const updateJobCandidate = async (
  { commit, dispatch, state },
  options
) => {
  commit('UPDATE_CANDIDATE_STATUS', true)
  commit('SET_CANDIDATE_ERROR', {})
  try {
    let id = state.scheduler.selected.header.clientId
    let date = state.scheduler.selected.payload.date
    let opt = Object.assign({}, options, {
      query: {
        dateFrom: state.search.params.dateFrom,
        dateTo: state.search.params.dateTo
      }
    })
    const response = await repository.update(opt)
    await dispatch('getClientSchedule', state.search.params)
    await dispatch('getClientJobs', { id, date })
    await dispatch('getCandidates', options)
    return response
  } catch (e) {
    console.log(e)
    commit('SET_CANDIDATE_ERROR', e.data.errors)
    return Promise.reject(e)
  } finally {
    commit('UPDATE_CANDIDATE_STATUS', false)
  }
}

export const getCandidates = async ({ commit, dispatch, state }, options) => {
  commit('UPDATE_CANDIDATE_STATUS', true)
  commit('SET_CANDIDATE_ERROR', {})
  try {
    let opt = Object.assign({}, options, {
      query: {
        dateFrom: state.search.params.dateFrom,
        dateTo: state.search.params.dateTo
      }
    })
    const response = await repository.fetchAllCandidates(opt)
    commit('UPDATE_CANDIDATE_LIST', response.data)
  } catch (e) {
    commit('SET_CANDIDATE_ERROR', e)
    return Promise.reject(e)
  } finally {
    commit('UPDATE_CANDIDATE_STATUS', false)
  }
}

export const clearCandidates = async ({ commit }) => {
  commit('CLEAR_CANDIDATE_LIST')
}
