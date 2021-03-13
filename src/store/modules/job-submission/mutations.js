import DateTimeUtils from '@/utils/dateUtils.js'
import Job from '@/models/Job'

const jobFields = new Job()

export const UPDATE_FIELD_VALUE = (state, value) => {
  Object.keys(state.job).forEach((jobKey) => {
    const fieldKey = Object.keys(value)[0]
    if (jobKey === fieldKey) {
      state.job[fieldKey] = value[fieldKey]
    }
  })

  if (value.selectedDates) {
    state.job.selectedDates = value.selectedDates.map((date) => {
      return DateTimeUtils.getDateFromJS(date)
    })
  }
}

export const SET_JOBS = state => {
  state.generatedJobs = state.job.selectedDates.map(item => {
    let existingJob = DateTimeUtils.getItemWithDate(state.generatedJobs, item)

    return {
      clientId: state.job.clientId.id,
      startTime: item,
      endTime: existingJob
        ? existingJob.endTime
        : DateTimeUtils.getCrossoverDate(
            state.job.startHours,
            state.job.endHours,
            item
          ),
      startHours: existingJob ? existingJob.startHours : state.job.startHours,
      endHours: existingJob ? existingJob.endHours : state.job.endHours,
      numberOfTemps: state.job.numberOfCandidates,
      bonuses: state.job.bonuses
        ? state.job.bonuses.map(item => item.id)
        : null,
      breakMinutes: state.job.breakMinutes
        ? state.job.breakMinutes.label
        : null,
      isBreakPayable: state.job.isBreakPayable,
      isBreakChangeable: state.job.isBreakChangeable
    }
  })
}

export const SET_CANDIDATES = (state, candidates) => {
  state.candidates = candidates
}

export const CLEAR_CANDIDATES = (state, candidates) => {
  state.candidates = []
}

export const SET_FETCHING = (state, status) => {
  state.isFetching = status
}

export const SET_META_DATA = (state, meta) => {
  state.meta = meta.pagination
}

export const SET_JOB_START_TIME = (state, options) => {
  state.generatedJobs = state.generatedJobs.map((i, index) => {
    if (index === options.id) {
      i.startHours = options.time
      i.endTime = DateTimeUtils.getCrossoverDate(
        i.startHours,
        i.endHours,
        i.startTime
      )
    }
    return i
  })
}

export const RESET_JOB_DATA = (state) => {
  state.meta = {}
  state.errors = []
  state.candidates = []
  state.job = { ...jobFields }
  state.generatedJobs = []
}

export const SET_JOB_END_TIME = (state, options) => {
  state.generatedJobs = state.generatedJobs.map((i, index) => {
    if (index === options.id) {
      i.endHours = options.time
      i.endTime = DateTimeUtils.getCrossoverDate(
        i.startHours,
        i.endHours,
        i.startTime
      )
    }
    return i
  })
}

export const DELETE_JOB = (state, options) => {
  state.generatedJobs = state.generatedJobs.filter((i, index) => {
    if (index !== options.id) {
      return i
    }
  })
}

export const SET_STATUS = (state, status) => {
  state.isSaved = status
}

export const RESET_JOB = state => {
  state.job = { ...jobFields }
  state.generatedJobs = []
}

export const RESET_GENERATED_JOBS = (state) => {
  state.generatedJobs = []
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}
