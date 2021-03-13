import * as repository from "./repository"
import ScheduledJob from "@/models/ScheduledJob.js"

export const getTeamSchedule = async ({ commit }, options) => {
  commit("UPDATE_STATUS", true)
  try {
    const response = await repository.all(options)
    commit("SET_TEAM_SCHEDULE", response.data)
    commit("UPDATE_META", response.meta)
    commit("UPDATE_STATUS", false)
  } catch (e) {
    commit("UPDATE_STATUS", false)
    return Promise.reject(e)
  }
}

export const getTeamScheduleLazy = async ({ commit }, options) => {
  try {
    const response = await repository.all(options)
    commit("PUSH_TEAM_SCHEDULE", response.data)
    commit("UPDATE_META", response.meta)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const clearTeamSchedule = async ({ commit }) => {
  commit("CLEAR_TEAM_SCHEDULE")
  commit("UPDATE_META", {})
}

export const getMemberJob = async ({ commit, dispatch }, jobId) => {
  dispatch("editJob/isFetching", true)
  try {
    const response = await repository.getJob(jobId)
    const memberJob = new ScheduledJob({
      jobId: response.id,
      status: response.status,
      startTime: response.startTime,
      endTime: response.endTime,
      client: response.client.name,
      candidate: `${response.user.firstName} ${response.user.lastName}`,
      jobType: response.jobRequest.jobType.name
    })
    dispatch("editJob/setFormItem", memberJob)
    dispatch("editJob/isFetching", false)
  } catch (e) {
    return Promise.reject
  }
}

export const cancelJob = async ({ commit, dispatch }, jobId) => {
  dispatch("editJob/isFetching", true)

  try {
    const response = await repository.cancelJob(jobId)
    const memberJob = new ScheduledJob({
      jobId: response.id,
      status: response.status,
      startTime: response.startTime,
      endTime: response.endTime,
      client: response.client.name,
      candidate: `${response.user.firstName} ${response.user.lastName}`,
      jobType: response.jobRequest.jobType.name
    })
    dispatch("editJob/isFetching", false)
    dispatch("editJob/itemDeleted", true)
    dispatch("editJob/setFormItem", memberJob)
    return Promise.resolve()
  } catch (e) {
    dispatch("editJob/isFetching", false)
    dispatch("editJob/setErrors", e.data.errors)
  }
}
