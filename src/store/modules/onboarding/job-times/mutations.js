import { wheelFormat } from '@/components/shared/doughnut-wheel/dataFormater'

export const JOB_TIMES_UPDATED = (state, payload) => {
  state.jobtimes = payload
}

export const JOB_TIME_UPDATE = (state, payload) => {
  const update = state.jobtimes.filter((time, index) => {
    return index === payload.index
  })
  if (payload.name) update[0].name = payload.name
  if (payload.inherit_id) update[0].inherit_id = payload.inherit_id
}

export const JOB_TIME_SET_DEFAULT = (state, payload) => {
  state.jobtimesdefault = payload
}

export const JOB_TIME_RESTORE_DEFAULT = (state) => {
  if (state.selectedClient) {
    let { dayTimes } = state.selectedClient
    dayTimes.length !== 0
      ? (state.jobtimes = wheelFormat(dayTimes))
      : (state.jobtimes = state.jobtimesdefault)
  } else {
    state.jobtimes = state.jobtimesdefault
  }
}

export const JOB_TIMES_SET_ACTIVE = (state, payload) => {
  state.jobtimesactive = payload
}

export const SET_CLIENT_JOB_TIMES = (state, payload) => {
  if (payload) {
    let { dayTimes } = payload
    state.selectedClient = payload
    dayTimes.length !== 0
      ? (state.jobtimes = wheelFormat(dayTimes))
      : (state.jobtimes = state.jobtimesdefault)
  } else {
    state.selectedClient = null
    state.jobtimes = state.jobtimesdefault
  }
}
