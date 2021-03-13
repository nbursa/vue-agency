// Store all jobs
export const STORE_CALENDAR_JOBS = (state, jobData) => {
  state.jobs = jobData
}

// Store currently selected cell's jobs
export const STORE_CALENDAR_JOBS_PER_DAY = (state, jobData) => {
  state.cellData = jobData
}
export const STORE_SELECTED_CALENDAR_DAY = (state, day) => {
  state.calendarDay = day
}


export const SET_CALENDAR_FILTERS = (state, filter) => {
  state.calendarFilters.includes(filter) 
    ? state.calendarFilters.splice(state.calendarFilters.indexOf(filter), 1) 
    : state.calendarFilters.push(filter)
}

export const CLEAR_CELL_DATA = (state) => {
  state.cellData = null
}