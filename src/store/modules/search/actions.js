export const updateSearchParams = ({ commit }, options) => {
  commit("UPDATE_SEARCH_PARAMS", options)
}

export const resetSearchParams = ({ commit }) => {
  commit("RESET_SEARCH_PARAMS")
}
