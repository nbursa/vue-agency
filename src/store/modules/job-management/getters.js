import DateTimeUtils from '@/utils/dateUtils.js'
import { deepObjectDiff } from '@/utils/general'

export const getJobLogs = (state) => {
  return (
    state.jobLog &&
    state.jobLog.logs.map((log) => {
      return {
        date: log.createdAt,
        initialEndTime: state.jobLog.initialEndTime,
        initialStartTime: state.jobLog.initialStartTime,
        author: log.user ? `${log.user.firstName} ${log.user.lastName}` : '',
        differences:
          log.previousState && log.previousState.length !== 0
            ? deepObjectDiff(log.currentState, log.previousState)
            : [],
        type: log.type
      }
    })
  )
}

export const jobs = (state) => state.jobs

export const clientLocations = (state) => state.clientLocations

export const jobLocation = (state) => state.jobLocation

export const getJobsWithDateTime = (state) => {
  return state.jobs.map((job) => {
    if (job.user) {
      job.user.fullName = job.user.firstName + ' ' + job.user.lastName
    }

    let startTime = '--'
    let endTime = '--'

    if (DateTimeUtils.hasStartDate(job)) {
      startTime = DateTimeUtils.getTimeFromSQL(job.startTime)
    }

    if (DateTimeUtils.hasEndDate(job)) {
      endTime = DateTimeUtils.getTimeFromSQL(job.endTime)
    }

    job.jobTime = startTime + ' - ' + endTime

    return job
  })
}
