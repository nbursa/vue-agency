
export const STORE_CALENDAR_AVAILABILITIES = (state, availabilities) => {
  state.availabilities = availabilities
}

export const STORE_CALENDAR_AVAILABILITIES_PER_DAY = (state, availabilities) => {
  state.cellData = availabilities
}
export const STORE_SELECTED_CALENDAR_DAY = (state, day) => {
  state.calendarDay = day
}
