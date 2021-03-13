export const SET_HOLIDAYS = (state, payload) => state.holidays = payload

export const ADD_HOLIDAY = (state, payload) => state.holidays.push(payload)

export const UPDATE_HOLIDAY = (state, payload) => {
  const { id } = payload

  const edit = state.holidays.filter(holiday => {
    return holiday.id === id
  })
  edit[0].name = payload.name
  edit[0].date = payload.date
}

export const REMOVE_HOLIDAY = (state, id) => {
  const idx = state.holidays.map(holiday => {
    return holiday.id
  }).indexOf(id)
  state.holidays.splice(idx, 1)
} 