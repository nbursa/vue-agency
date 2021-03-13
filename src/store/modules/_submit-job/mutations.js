import { initialState } from './const'
import DateTimeUtils from '@/utils/dateUtils.js'

const jobFields = { ...initialState.job }

export const GET_JOB_TEMPLATES = (state, templates) => {
  state.templates = templates
}

export const REMOVE_TEMPLATE = (state, template) => {
  const filtered = [...state.templates].filter(({ id }) => id !== template.id)
  state.templates = filtered
}

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

export const SET_JOBS = (state) => {
  state.generatedJobs = state.job.selectedDates.map((item) => {
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
        ? state.job.bonuses.map((item) => item.id)
        : null,
      breakMinutes: state.job.breakMinutes
        ? state.job.breakMinutes.label
        : null,
      isBreakPayable: state.job.isBreakPayable,
      isBreakChangeable: state.job.isBreakChangeable
    }
  })
}

export const RESET_JOB = (state) => {
  state.job = { ...jobFields }
  state.generatedJobs = []
}

export const SET_JOB_RATES = (state, rates) => {
  const ratesObj = {}

  rates.forEach((item) => {
    if (!ratesObj[item.dayTime.id]) ratesObj[item.dayTime.id] = [item]
    else ratesObj[item.dayTime.id].push(item)
  })

  state.payRates = ratesObj
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}

export const SET_CANDIDATES = (state, candidates) => {
  state.candidates = candidates
}

export const SET_STATUS = (state, status) => {
  state.isSaved = status
}

export const FILTER_CANDIDATES = (state, term) => {
  state.candidatesSearch = term
}

export const SET_GROUPS = (state, set) => {
  if (!set) return (state.candidateGroups = [])
  const { job, candidates } = state
  state.candidateGroups = [...candidates].reduce((all, one, i) => {
    const ch = Math.floor(i / job.groupSize)
    all[ch] = [].concat(all[ch] || [], { ...one, group: ch + 1 })
    return all
  }, [])
}

export const UPDATE_GROUPS = (state, { group, candidates }) => {
  let newCandidateGroups = [...state.candidateGroups]

  const uniqs = []
  newCandidateGroups[group] = candidates
    .map((groupItem) => {
      if (!uniqs.includes(groupItem.id)) {
        uniqs.push(groupItem.id)
        return {
          ...groupItem,
          group: group + 1
        }
      }
      return null
    })
    .filter((item) => item !== null)

  newCandidateGroups = newCandidateGroups.map((cGroup, i) => {
    if (i === group) return cGroup
    return cGroup
      .map((item) => {
        if (!uniqs.includes(item.id)) {
          return item
        }
        return null
      })
      .filter((item) => item !== null)
  })

  state.candidateGroups = newCandidateGroups
}

export const DISPLAY_RATES = (state, val) => {
  state.canSeeRates = val
}
