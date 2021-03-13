import * as repository from "./repository"

export const getShifts = async ({ commit }, options) => {
  if(options.response_type && options.response_type === 'all') {
    try {
      const res = await repository.all(options)
      return res.data
    } catch(e) {
      commit("SET_ERRORS", e.data.errors)
    }
  } else {
    commit("UPDATE_STATUS", true)
    try {
      if(!options.client_id) options.client_id = "returnEmpty"
      const shifts = await repository.all(options)
      commit("UPDATE_STATUS", false)
      commit("UPDATE_SHIFTS", shifts.data)
      commit("UPDATE_META_DATA", shifts.meta)
    } catch(e) {
      commit("SET_ERRORS", e.data.errors)
    }
  }
}

export const clearInvoice = async ({ commit }) => {
  try {
    commit("SET_SELECTED_SHIFTS", {})
  } catch(e) {
    console.log("error",e)
  }
}

export const setAdditional = async ({commit}, payload) => {
  try {
    commit("SET_ADDITIONAL", payload)
  } catch (e) {
    console.log("error", e)
  }
}

export const removeAdditional = async ({commit}, payload) => {
  try {
    commit("REMOVE_ADDITIONAL", payload)
  } catch (e) {
    console.log("error", e)
  }
}

export const clearAdditionals = async ({commit}) => {
  try {
    commit("CLEAR_ADDITIONALS")
  } catch (e) {
    console.log("error", e)
  }
}

export const getInvoicePreview = async ({commit}, payload) => {
  try {
    const data = await repository.getInvoicePreview({jobs: payload.jobs, additionals: payload.additionals})
    commit("SET_SELECTED_SHIFTS", data)
  } catch (e) {
    console.log("error", e)
  }
}

export const createInvoice = async ({commit}, payload) => {
  try {
    const data = await repository.submitInvoice(payload)
    return data
  } catch (e) {
    console.log("error", e)
  }
}
