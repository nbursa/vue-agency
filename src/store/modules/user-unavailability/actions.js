import * as repository from "./repository.js"

export const getUserRequests = ({ commit }, options) => {
  const defaultQueryParams = {
    page: 1,
    orderBy: "id",
    sortBy: "desc",
    type: "holiday",
    include: "dates,user"
  }
  const queryParams = _.merge({}, defaultQueryParams, options)
  if (options.type === 'all') {
    delete queryParams.type
  }
  commit("UPDATE_STATUS", true)
  repository
    .all(queryParams)
    .then(requests => {
      commit("SET_USER_REQUESTS", requests.data)
      commit("UPDATE_META_DATA", requests.meta)
      commit("UPDATE_STATUS", false)
    })
    .catch(e => {
      let errorMessage = e.data.errors.length !== 0 ? e.data.errors : { error: e.data.message }
      dispatch("edit/setErrors",  errorMessage)
    })
}

export const getUserRequest = ({ commit, dispatch }, options) => {
  dispatch("edit/isFetching", true)
  repository
    .get(options)
    .then(userRequest => {
      dispatch("edit/setFormItem", userRequest)
      dispatch("edit/isFetching", false)
    })
    .catch(e => {
      dispatch("edit/isFetching", false)
      dispatch("edit/itemSaved", false)
      if (e.data && e.data.errors) {
        let errorMessage = e.data.errors.length !== 0 ? e.data.errors : { error: e.data.message }
        dispatch("edit/setErrors",  errorMessage)
      }
    })
}

export const approve = ({ commit, dispatch }, options) => {
  dispatch("edit/isFetching", true)
  repository
    .put({ action: "accept", id: options.id, note: options.note })
    .then(response => {
      dispatch("edit/itemSaved", true)
      commit("REMOVE_REQUEST", { id: options.id })
    }).catch(e => {
      if (e.data && e.data.errors) {
        let errorMessage = e.data.errors.length !== 0 ? e.data.errors : { error: e.data.message }
        dispatch("edit/setErrors",  errorMessage)
      }
    }).finally(() => {
      dispatch("edit/isFetching", false)
    })
}

export const reject = ({ commit, dispatch }, options) => {
  dispatch("edit/isFetching", true)
  repository
    .put({ action: "reject", id: options.id, note: options.note })
    .then(response => {
      dispatch("edit/itemSaved", true)
      commit("REMOVE_REQUEST", { id: options.id })
    }).catch(e => {
      if (e.data && e.data.errors) {
        let errorMessage = e.data.errors.length !== 0 ? e.data.errors : { error: e.data.message }
        dispatch("edit/setErrors",  errorMessage)
      }
    }).finally(() => {
      dispatch("edit/isFetching", false)
    })
}

export const acknowledge = ({ commit, dispatch }, options) => {
  dispatch("edit/isFetching", true)
  repository
    .put({ action: "acknowledge", id: options.id, note: options.note })
    .then(response => {
       dispatch("edit/itemSaved", true)
      commit("REMOVE_REQUEST", { id: options.id })
    }).catch(e => {
      if (e.data && e.data.errors) {
        let errorMessage = e.data.errors.length !== 0 ? e.data.errors : { error: e.data.message }
        dispatch("edit/setErrors",  errorMessage)
      }
    }).finally(() => {
      dispatch("edit/isFetching", false)
    })
}
