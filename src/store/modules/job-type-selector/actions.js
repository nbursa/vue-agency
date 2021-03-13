export const addSelectedJobType = ({ commit }, jobType) => {
  commit("ADD_SELECTED_JOB_TYPE", jobType)
}

export const removeSelectedJobType = ({ commit }, jobType) => {
  commit("REMOVE_SELECTED_JOB_TYPE", jobType)
}

export const updateSelectedJobType = ({ commit }, jobType) => {
  commit("UPDATE_SELECTED_JOB_TYPE", jobType)
}

export const resetSelectedJobType = ({ commit }) => {
  commit("RESET")
}

export const setSelectedJobTypes = ({ commit }, jobTypes) => {
  commit("SET_SELECTED_JOB_TYPES", jobTypes)
}
