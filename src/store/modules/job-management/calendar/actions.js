import * as repo from "./repository"
import { isEmpty } from "lodash"

// Fetch all jobs
export const fetchJobs = async ({ commit }, range = {}) => {
  const data = await repo.fetchJobs(range)
  commit("STORE_CALENDAR_JOBS", data)
  return Promise.resolve(data)
}

export const setFilter = async ({commit}, filter) => {
  commit("SET_CALENDAR_FILTERS", filter)
  return Promise.resolve(filter)
}

export const clearCellData = async  ({commit}) => {
  commit("CLEAR_CELL_DATA")
  return Promise.resolve()
}

// Fetch jobs per selected day in calendar
export const fetchJobsByDay = async (
  { commit, dispatch },
  { dayFormatted, shouldFetch, updateRng }
) => {
  if (shouldFetch) {
    commit("IS_LOADING", true, { root: true })
    const data = await repo.fetchJobsByDay(dayFormatted)
    // For Rastko!
    commit("STORE_SELECTED_CALENDAR_DAY", dayFormatted)
    // End for Rastko
    commit("STORE_CALENDAR_JOBS_PER_DAY", data)
    commit("IS_LOADING", false, { root: true })
    const { start, end } = updateRng
    let dateFrom = start.toFormat("yyyy-LL-dd")
    let dateTo = end.toFormat("yyyy-LL-dd")
    // console.log(start.toISODate(), end.toISODate())
    const jobs = await dispatch("fetchJobs", {
      range: {
        dateFrom,
        dateTo
      }
    })
    return Promise.resolve(jobs)
  } else {
    commit("STORE_CALENDAR_JOBS_PER_DAY", {
      "date": dayFormatted
    })
    // No jobs for this day, no link in VCellDetails!
    commit("STORE_SELECTED_CALENDAR_DAY", null)
  }
}
