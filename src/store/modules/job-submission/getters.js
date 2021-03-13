import { updateJobStartTime } from "./actions"
import {
  DateTime
} from "luxon"

const isValid = value => {
  if (typeof value === Array) {
    return value && value.length > 0 ? true : false
  }

  return value && value != "" ? true : false
}

const isRateOverrideValid = (isChangeable, value) => {
  return isChangeable ? value.margin && value.rate : true
}

export const getValidBreak = (state, getters, rootState) => {
  let { breakMinutes: _break } = state.job
  let dateFormat = rootState.localization.dateFormat
  
  if(_break) {
    let isValid = state.generatedJobs.find(job => {
      let startTime = `${job.startTime} ${job.startHours}`
      let endTime = `${job.endTime} ${job.endHours}`
      let d1 = DateTime.fromFormat(startTime, `${dateFormat} HH:mm`)
      let d2 = DateTime.fromFormat(endTime, `${dateFormat} HH:mm`)
      let diff = d2.diff(d1, ['minutes']).toObject().minutes
      console.log("WHT", diff, _break.label)
      return diff <= _break.label
    })
    return !isValid
  } else {
    return true
  }
}

export const getValidJob = state => {
  return (
    isValid(state.job.agencyId) &&
    isValid(state.job.jobTypeId) &&
    isValid(state.job.clientId) &&
    isValid(state.job.paymentType) &&
    isValid(state.job.numberOfCandidates) &&
    isValid(state.job.selectedDates) &&
    isValid(state.job.gradeId) &&
    isValid(state.job.startHours) &&
    isValid(state.job.endHours) &&
    isRateOverrideValid(state.job.isRateChangeable, state.job.rateOverride)
  )
}

export const showCalendar = state => {
  return (
    isValid(state.job.agencyId) &&
    isValid(state.job.jobTypeId) &&
    isValid(state.job.clientId) &&
    isValid(state.job.numberOfCandidates) &&
    isValid(state.job.gradeId) &&
    isValid(state.job.startHours) &&
    isValid(state.job.endHours)
  )
}

export const showTime = state => {
  return (
    isValid(state.job.agencyId) &&
    isValid(state.job.jobTypeId) &&
    isValid(state.job.clientId) &&
    isValid(state.job.numberOfCandidates) &&
    isValid(state.job.gradeId)
  )
}

export const getErrors = state => state.errors

export const getCandidateList = state =>
  state.candidates.map(candidate => {
    candidate.fullName = candidate.firstName + " " + candidate.lastName
    return candidate
  })
