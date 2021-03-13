import * as repo from './repository'

// Fetch all availabilities
export const fetchAvailabilities = async ({ commit }, range = {}) => {
  const data = await repo.fetchAvailabilities(range)
  commit('STORE_CALENDAR_AVAILABILITIES', data)
  return Promise.resolve(data)
}

// Fetch jobs per selected day in calendar
export const fetchAvailabilitiesByDay = async (
  { commit, dispatch },
  { dayFormatted, shouldFetch, updateRng }
) => {
  if (shouldFetch) {
    commit('IS_LOADING', true, { root: true })
    const data = await repo.fetchAvailabilitiesByDay(dayFormatted)
    // For Rastko!
    commit('STORE_SELECTED_CALENDAR_DAY', dayFormatted)
    // End for Rastko
    commit('STORE_CALENDAR_AVAILABILITIES_PER_DAY', data)
    commit('IS_LOADING', false, { root: true })
    const { start, end } = updateRng
    let dateFrom = start.toFormat('yyyy-LL-dd')
    let dateTo = end.toFormat('yyyy-LL-dd')
    // console.log(start.toISODate(), end.toISODate())
    const jobs = await dispatch('fetchJobs', {
      range: {
        dateFrom,
        dateTo
      }
    })
    return Promise.resolve(jobs)
  } else {
    commit('STORE_CALENDAR_JOBS_PER_DAY', {
      [dayFormatted]: {}
    })
    // No jobs for this day, no link in VCellDetails!
    commit('STORE_SELECTED_CALENDAR_DAY', null)
  }
}

export const submitJob = async ({ dispatch }, payload) => {
  try {
    const response = await repo.submit(payload)
    return response.data
  } catch (e) {
    console.log('job submit error', e)
    throw e.data
  }
}
