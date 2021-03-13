export const setActiveShifts = ({ commit }, shitsData) => {
  commit('SET_ACTIVE_SHIFTS', shitsData)
}

export const editShiftTimes = ({ commit }, data) => {
  commit('EDIT_SHIFTS_DATA', data)
}

export const setSortType = ({ commit }, data) => {
  commit('SET_SORT_TYPE', data)
}

export const splitShift = ({ commit }, data) => {
  commit('SPLIT_SHIFT', data)
}

export const removeShift = ({ commit }, data) => {
  commit('REMOVE_SHIFT', data)
}
