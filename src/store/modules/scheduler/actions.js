export const setSchedulerFilter = (({ commit }, payload) => {
  console.log("FILTER SET PAYLOAD", payload)
})

export const setPage = ({ commit }, payload) => {
  commit("SET_PAGE", payload)
}

export const setSelectedCell = ({ commit }, payload) => {
  commit("SET_SELECTED_CELL", payload)
}
export const setInterval = ({ commit }, payload) => {
  commit("SET_SELECTED_INTERVAL", payload)
}