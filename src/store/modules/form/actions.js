export const setFormItem = ({ commit, dispatch }, item) => {
  commit("SET_FORM_ITEM", item)
  dispatch("itemSaved", false)
  dispatch("itemDeleted", false)
  dispatch("isFetching", false)
}

export const updateItemField = ({ commit }, value) => {
  commit("UPDATE_ITEM_FIELD", value)
}

export const removeItemField = ({ commit }, value) => {
  commit("REMOVE_ITEM_FIELD", value)
}

export const addChildItem = ({ commit }, jobType) => {
  commit("ADD_SELECTED_JOB_TYPE", jobType)
}

export const removeChildItem = ({ commit }, jobType) => {
  commit("REMOVE_SELECTED_JOB_TYPE", jobType)
}

export const isFetching = ({ commit }, status) => {
  commit("SET_IS_FETCHING", status)
}

export const isSignOff = ({ commit }, value) => {
  commit("SET_IS_SIGN_OFF", value)
}

export const itemSaved = ({ commit }, value) => {
  commit("SET_ITEM_SAVED", value)
}

export const itemDeleted = ({ commit }, value) => {
  commit("SET_ITEM_DELETED", value)
}

export const setErrors = ({ commit }, errors) => {
  commit("SET_ERRORS", errors)
}

export const setUploadStatus = ({ commit }, status) => {
  commit("SET_UPLOAD_STATUS", status)
}

export const clearErrors = ({ commit }) => {
  commit("CLEAR_ERRORS")
}

export const clearError = ({ commit }, error) => {
  commit("DELETE_ERROR")
}

export const setChildItems = ({ commit }, items) => {
  commit("SET_CHILD_ITEMS", items)
}
